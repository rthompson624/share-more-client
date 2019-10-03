import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthenticationStoreEffects } from './effects';
import { authenticationReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('authentication', authenticationReducer),
    EffectsModule.forFeature([AuthenticationStoreEffects])
  ],
  declarations: [],
  providers: [AuthenticationStoreEffects]
})
export class AuthenticationStoreModule { }
