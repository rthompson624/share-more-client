import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListContainerComponent } from './containers/item-list-container/item-list-container.component';
import { ItemDetailContainerComponent } from './containers/item-detail-container/item-detail-container.component';
import { ItemCreateContainerComponent } from './containers/item-create-container/item-create-container.component';
import { ItemEditContainerComponent } from './containers/item-edit-container/item-edit-container.component';

const routes: Routes = [
  {
    path: '',
    component: ItemListContainerComponent
  },
  {
    path: 'create',
    component: ItemCreateContainerComponent
  },
  {
    path: ':id',
    component: ItemDetailContainerComponent,
  },
  {
    path: ':id/edit',
    component: ItemEditContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {
}
