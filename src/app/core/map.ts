export interface MapData {
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
