import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'mapbox', loadChildren: () => import('./mapbox/mapbox.module').then(m => m.MapboxModule) }, { path: 'deck', loadChildren: () => import('./deck/deck.module').then(m => m.DeckModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
