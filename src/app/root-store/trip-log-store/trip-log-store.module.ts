import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TripLogStoreEffects } from './effects';
import { tripLogReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('triplog', tripLogReducer),
    EffectsModule.forFeature([TripLogStoreEffects])
  ],
  declarations: [],
  providers: [TripLogStoreEffects]
})
export class TripLogStoreModule { }
