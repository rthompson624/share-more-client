import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'items',
    loadChildren: './item/item.module#ItemModule'
  },
  {
    path: 'users',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
