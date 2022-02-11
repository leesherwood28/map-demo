import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { INITIAL_VIEW_STATE, MapDataService } from '../core/map-data.service';
import * as mapboxgl from 'mapbox-gl';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYWxleGhvcmxvY2siLCJhIjoiY2s0OGg1MHc4MDdxNjNscHJwYTB2bHJ1YiJ9.c3H4HGTppUzmOsxX-KvlCw';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
})
export class MapboxComponent implements OnInit, AfterViewInit {
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
  }

  private setupMapData() {}
}
