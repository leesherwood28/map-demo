import { Injectable } from '@angular/core';
import { interval, map, Observable, throttleTime } from 'rxjs';

interface MapData {
  latDeg: number;
  lngDeg: number;
}

export const INITIAL_VIEW_STATE = {
  latitude: 51,
  longitude: -1,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

export const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYWxleGhvcmxvY2siLCJhIjoiY2s0OGg1MHc4MDdxNjNscHJwYTB2bHJ1YiJ9.c3H4HGTppUzmOsxX-KvlCw';

@Injectable({
  providedIn: 'root',
})
export class MapDataService {
  constructor() {}

  selectMapData(): Observable<MapData> {
    return interval(1000).pipe(
      map((i) => {
        return {
          latDeg: 51,
          lngDeg: -1 - 0.01 * i,
        };
      })
    );
  }
}
