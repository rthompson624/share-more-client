import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommunityItemStoreEffects } from './effects';
import { communityItemReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('community-item', communityItemReducer),
    EffectsModule.forFeature([CommunityItemStoreEffects])
  ],
  declarations: [],
  providers: [CommunityItemStoreEffects]
})
export class CommunityItemStoreModule { }
