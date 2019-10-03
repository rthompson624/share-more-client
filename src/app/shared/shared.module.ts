import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule, MatChipsModule, MatIconModule } from '@angular/material';

import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const components = [
  MainLayoutComponent,
  NotFoundComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBarModule,
    MatChipsModule,
    MatIconModule
  ],
  declarations: [...components],
  exports: [...components]
})
export class SharedModule { }
