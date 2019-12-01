import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityItemDetailContainerComponent } from './containers/community-item-detail-container/community-item-detail-container.component';
import { CommunityItemListScrollContainerComponent } from './containers/community-item-list-scroll-container/community-item-list-scroll-container.component';

const routes: Routes = [
  {
    path: '',
    component: CommunityItemListScrollContainerComponent
  },
  {
    path: ':id',
    component: CommunityItemDetailContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityItemRoutingModule {
}
