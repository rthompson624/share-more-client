import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TripStoreModule } from './trip-store/trip-store.module';
import { TripLogStoreModule } from './trip-log-store/trip-log-store.module';
import { AuthenticationStoreModule } from './authentication-store/authentication-store.module';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    TripStoreModule,
    TripLogStoreModule,
    StoreModule.forRoot({ routerReducer: routerReducer }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthenticationStoreModule
  ],
  declarations: []
})
export class RootStoreModule { }
