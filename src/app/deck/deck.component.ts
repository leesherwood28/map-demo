import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  INITIAL_VIEW_STATE,
  MAPBOX_TOKEN,
  MapDataService,
} from '../core/map-data.service';
import { Deck } from '@deck.gl/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJsonLayer } from '@deck.gl/layers';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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

  constructor(private mapDataService: MapDataService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.buildMap();
    this.buildDeckGL();
    this.setupLayers();
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
      this.mapDataService
        .selectMapData()
        .pipe(untilDestroyed(this))
        .subscribe((data) => {
          const layer = new GeoJsonLayer({
            id: 'geojson-layer',
            data: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [data.lngDeg, data.latDeg],
                },
              },
            ],
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
