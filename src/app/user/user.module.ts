import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
