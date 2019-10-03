import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailContainerComponent } from './containers/user-detail-container/user-detail-container.component';

const routes: Routes = [
  {
    path: '',
    component: UserDetailContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
