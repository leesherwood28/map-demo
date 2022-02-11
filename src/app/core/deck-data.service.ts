import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { MapData } from './map';

interface LayerState {
  data: MapData;
  visible: boolean;
}

const INITIAL_LAYER_STATE: LayerState = {
  data: {
    latDeg: 51,
    lngDeg: -1,
  },
  visible: true,
};

@Injectable({
  providedIn: 'root',
})
export class DeckDataService {
  private _state$ = new BehaviorSubject<LayerState>(INITIAL_LAYER_STATE);
  constructor() {
    this.intervalChangeState();
  }

  selectState() {
    return this._state$.asObservable();
  }
  togglePointVisibility() {
    const state = this._state$.value;
    state.visible = !state.visible;
    this._state$.next(state);
  }

  private intervalChangeState() {
    interval(1000).subscribe(() => {
      const state = this._state$.value;
      state.data.lngDeg = state.data.lngDeg - 0.01;
      this._state$.next(state);
    });
  }

  resetState() {
    this._state$.next(INITIAL_LAYER_STATE);
  }
}
