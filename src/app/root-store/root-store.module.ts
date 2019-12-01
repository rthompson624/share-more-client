import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer, RouterState } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ItemStoreModule } from './item-store/item-store.module';
import { CommunityItemStoreModule } from './community-item-store/community-item-store.module';
import { AuthenticationStoreModule } from './authentication-store/authentication-store.module';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    ItemStoreModule,
    CommunityItemStoreModule,
    StoreModule.forRoot(
      { routerReducer: routerReducer },
      { runtimeChecks:
        {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
        }
      }
    ),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthenticationStoreModule
  ],
  declarations: []
})
export class RootStoreModule { }
