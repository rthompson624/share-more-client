import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatCardModule,
  MatInputModule, MatProgressSpinnerModule, MatDialogModule
} from '@angular/material';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';

import { UserDetailContainerComponent } from './containers/user-detail-container/user-detail-container.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserEditorDialogComponent } from './components/user-editor-dialog/user-editor-dialog.component';

@NgModule({
  entryComponents: [
    UserEditorDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    UserDetailContainerComponent,
    UserDetailComponent,
    UserEditorDialogComponent
  ]
})
export class UserModule {
}