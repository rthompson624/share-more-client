import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
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
import { ItemListScrollContainerComponent } from './containers/item-list-scroll-container/item-list-scroll-container.component';
import { ItemCardComponent } from './components/item-card/item-card.component';

@NgModule({
  entryComponents: [
    ItemDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    ItemRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCardModule,
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
    ItemDeleteDialogComponent,
    ItemListScrollContainerComponent,
    ItemCardComponent
  ]
})
export class ItemModule {
}
