import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapboxRoutingModule } from './mapbox-routing.module';
import { MapboxComponent } from './mapbox.component';


@NgModule({
  declarations: [
    MapboxComponent
  ],
  imports: [
    CommonModule,
    MapboxRoutingModule
  ]
})
export class MapboxModule { }
