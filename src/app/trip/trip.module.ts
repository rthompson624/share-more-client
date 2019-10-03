import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, 
  MatProgressSpinnerModule, MatTableModule, MatDialogModule,
  MatPaginatorModule, MatDatepickerModule, MatSelectModule
} from '@angular/material';

import { TripRoutingModule } from './trip-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TripLogModule } from '../trip-log/trip-log.module';

import { TripListContainerComponent } from './containers/trip-list-container/trip-list-container.component';
import { TripDetailContainerComponent } from './containers/trip-detail-container/trip-detail-container.component';
import { TripCreateContainerComponent } from './containers/trip-create-container/trip-create-container.component';
import { TripEditContainerComponent } from './containers/trip-edit-container/trip-edit-container.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { TripEditorComponent } from './components/trip-editor/trip-editor.component';
import { TripDeleteDialogComponent } from './components/trip-delete-dialog/trip-delete-dialog.component';

@NgModule({
  entryComponents: [
    TripDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
    TripLogModule,
    MatDialogModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  declarations: [
    TripListContainerComponent,
    TripListComponent,
    TripDetailComponent,
    TripDetailContainerComponent,
    TripEditorComponent,
    TripCreateContainerComponent,
    TripEditContainerComponent,
    TripDeleteDialogComponent
  ]
})
export class TripModule {
}