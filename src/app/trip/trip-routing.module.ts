import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripListContainerComponent } from './containers/trip-list-container/trip-list-container.component';
import { TripDetailContainerComponent } from './containers/trip-detail-container/trip-detail-container.component';
import { TripCreateContainerComponent } from './containers/trip-create-container/trip-create-container.component';
import { TripEditContainerComponent } from './containers/trip-edit-container/trip-edit-container.component';

const routes: Routes = [
  {
    path: '',
    component: TripListContainerComponent
  },
  {
    path: 'create',
    component: TripCreateContainerComponent
  },
  {
    path: ':id',
    component: TripDetailContainerComponent,
  },
  {
    path: ':id/edit',
    component: TripEditContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule {
}