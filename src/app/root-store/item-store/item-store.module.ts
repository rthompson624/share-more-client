import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ItemStoreEffects } from './effects';
import { itemReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('item', itemReducer),
    EffectsModule.forFeature([ItemStoreEffects])
  ],
  declarations: [],
  providers: [ItemStoreEffects]
})
export class ItemStoreModule { }
