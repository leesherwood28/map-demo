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

@Injectable({
  providedIn: 'root',
})
export class MapDataService {
  constructor() {}

  selectMapData(): Observable<MapData> {
    return interval(1000).pipe(
      map((i) => {
        return {
          latDeg: 49 - i * 0.001,
          lngDeg: -1,
        };
      })
    );
  }
}
