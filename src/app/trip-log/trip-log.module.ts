import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, 
  MatCardModule, MatDialogModule, MatDatepickerModule, MatSelectModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { TripLogListComponent } from './components/trip-log-list/trip-log-list.component';
import { TripLogDetailComponent } from './components/trip-log-detail/trip-log-detail.component';
import { TripLogEditorDialogComponent } from './components/trip-log-editor-dialog/trip-log-editor-dialog.component';
import { TripLogDetailContainerComponent } from './containers/trip-log-detail-container/trip-log-detail-container.component';
import { TripLogListContainerComponent } from './containers/trip-log-list-container/trip-log-list-container.component';
import { TripLogDeleteDialogComponent } from './components/trip-log-delete-dialog/trip-log-delete-dialog.component';

const components = [
  TripLogListComponent,
  TripLogDetailComponent,
  TripLogEditorDialogComponent,
  TripLogDetailContainerComponent,
  TripLogListContainerComponent,
  TripLogDeleteDialogComponent
];

@NgModule({
  entryComponents: [
    TripLogEditorDialogComponent,
    TripLogDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  declarations: [...components],
  exports: [...components]
})
export class TripLogModule {
}
