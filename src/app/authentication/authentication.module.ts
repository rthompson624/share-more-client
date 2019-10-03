import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, 
  MatProgressSpinnerModule
} from '@angular/material';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';

@NgModule({
  entryComponents: [],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    CreateAccountComponent
  ]
})
export class AuthenticationModule {
}