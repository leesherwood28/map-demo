import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { INITIAL_VIEW_STATE, MapDataService } from '../core/map-data.service';
import * as mapboxgl from 'mapbox-gl';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYWxleGhvcmxvY2siLCJhIjoiY2s0OGg1MHc4MDdxNjNscHJwYTB2bHJ1YiJ9.c3H4HGTppUzmOsxX-KvlCw';

enum MapSource {
  exampleSource = 'exampleSource',
}

enum MapLayer {
  exampleLayer = 'exampleLayer',
}

const EXAMPLE_LAYER = {
  id: MapLayer.exampleLayer,
  source: MapSource.exampleSource,
  type: 'circle',
  paint: {
    'circle-radius': {
      base: 2,
      stops: [
        [10, 5],
        [13, 11],
      ],
    },
    'circle-color': '#D29500',
  },
};

function getExampleFeature() {
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Point',
      coordinates: [] as number[],
    },
  };
}

@UntilDestroy()
@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
})
export class MapboxComponent implements OnInit, AfterViewInit {
  readonly exampleFeature = getExampleFeature();

  @ViewChild('map') mapEl!: ElementRef<HTMLDivElement>;
  map!: mapboxgl.Map;

  constructor(private mapDataService: MapDataService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupMap();
  }

  private setupMap() {
    this.map = new mapboxgl.Map({
      container: this.mapEl.nativeElement,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      bearing: INITIAL_VIEW_STATE.bearing,
      pitch: INITIAL_VIEW_STATE.pitch,
      accessToken: MAPBOX_TOKEN,
      interactive: true,
    });
    this.map.on('style.load', () => {
      this.setupMapSources();
      this.setupMapLayers();
      this.setupMapData();
    });
  }

  private setupMapLayers() {
    // @ts-ignore
    this.map.addLayer(EXAMPLE_LAYER);
  }

  private setupMapSources() {
    this.map.addSource(MapSource.exampleSource, {
      type: 'geojson',
      // @ts-ignore
      data: this.exampleFeature,
    });
  }

  private setupMapData() {
    this.mapDataService
      .selectMapData()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.exampleFeature.geometry.coordinates = [data.lngDeg, data.latDeg];
        // @ts-ignore
        this.map
          .getSource(MapSource.exampleSource)
          // @ts-ignore
          .setData(this.exampleFeature);
      });
  }
}
