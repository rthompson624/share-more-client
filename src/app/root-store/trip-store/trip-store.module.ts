import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TripStoreEffects } from './effects';
import { tripReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('trip', tripReducer),
    EffectsModule.forFeature([TripStoreEffects])
  ],
  declarations: [],
  providers: [TripStoreEffects]
})
export class TripStoreModule { }
