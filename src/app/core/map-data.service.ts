import { Injectable } from '@angular/core';
import { interval, map, Observable, throttleTime } from 'rxjs';
import { MapData } from './map';

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
