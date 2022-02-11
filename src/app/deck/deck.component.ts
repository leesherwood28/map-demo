import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Deck } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as mapboxgl from 'mapbox-gl';
import { DeckDataService } from '../core/deck-data.service';
import { INITIAL_VIEW_STATE, MAPBOX_TOKEN } from '../core/map';

@UntilDestroy()
@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
  @ViewChild('map') mapEl!: ElementRef<HTMLDivElement>;
  @ViewChild('deck') deckCanvasEl!: ElementRef<HTMLCanvasElement>;

  map!: mapboxgl.Map;
  deck!: Deck;

  constructor(private deckDataService: DeckDataService) {}

  ngOnInit(): void {
    this.deckDataService.resetState();
  }

  ngAfterViewInit() {
    this.buildMap();
    this.buildDeckGL();
    this.setupLayers();
  }

  togglePointVisibilty() {
    this.deckDataService.togglePointVisibility();
  }

  private buildMap() {
    this.map = new mapboxgl.Map({
      container: this.mapEl.nativeElement,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      bearing: INITIAL_VIEW_STATE.bearing,
      pitch: INITIAL_VIEW_STATE.pitch,
      accessToken: MAPBOX_TOKEN,
      // Note: deck.gl will be in charge of interaction and event handling
      interactive: false,
    });
  }

  private buildDeckGL() {
    this.deck = new Deck({
      canvas: this.deckCanvasEl.nativeElement,
      controller: true,
      initialViewState: INITIAL_VIEW_STATE,
      onViewStateChange: ({ viewState }) => {
        this.map.jumpTo({
          center: [viewState.longitude || 0, viewState.latitude || 0],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch,
        });
      },
      layers: [],
    });
  }

  private setupLayers() {
    this.map.on('load', () => {
      this.deckDataService
        .selectState()
        .pipe(untilDestroyed(this))
        .subscribe((state) => {
          const layer = new GeoJsonLayer({
            id: 'geojson-layer',
            data: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [state.data.lngDeg, state.data.latDeg],
                },
              },
            ],
            visible: state.visible,
            filled: true,
            pointRadiusMinPixels: 5,
            pointRadiusScale: 1,
            getPointRadius: 5,
            getFillColor: [255, 255, 255],
          });
          this.deck.setProps({ layers: [layer] });
        });
    });
  }
}
