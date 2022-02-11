import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckRoutingModule } from './deck-routing.module';
import { DeckComponent } from './deck.component';


@NgModule({
  declarations: [
    DeckComponent
  ],
  imports: [
    CommonModule,
    DeckRoutingModule
  ]
})
export class DeckModule { }
