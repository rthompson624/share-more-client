import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, 
  MatProgressSpinnerModule, MatTableModule, MatDialogModule,
  MatPaginatorModule, MatDatepickerModule, MatSelectModule
} from '@angular/material';

import { ItemRoutingModule } from './item-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ItemListContainerComponent } from './containers/item-list-container/item-list-container.component';
import { ItemDetailContainerComponent } from './containers/item-detail-container/item-detail-container.component';
import { ItemCreateContainerComponent } from './containers/item-create-container/item-create-container.component';
import { ItemEditContainerComponent } from './containers/item-edit-container/item-edit-container.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ItemEditorComponent } from './components/item-editor/item-editor.component';
import { ItemDeleteDialogComponent } from './components/item-delete-dialog/item-delete-dialog.component';

@NgModule({
  entryComponents: [
    ItemDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  declarations: [
    ItemListContainerComponent,
    ItemListComponent,
    ItemDetailComponent,
    ItemDetailContainerComponent,
    ItemEditorComponent,
    ItemCreateContainerComponent,
    ItemEditContainerComponent,
    ItemDeleteDialogComponent
  ]
})
export class ItemModule {
}