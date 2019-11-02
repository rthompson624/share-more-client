import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
