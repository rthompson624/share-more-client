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
import { MatRippleModule } from '@angular/material/core';
import { CommunityItemRoutingModule } from './community-item-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommunityItemDetailContainerComponent } from './containers/community-item-detail-container/community-item-detail-container.component';
import { CommunityItemListScrollContainerComponent } from './containers/community-item-list-scroll-container/community-item-list-scroll-container.component';
import { CommunityItemCardComponent } from './components/community-item-card/community-item-card.component';
import { CommunityItemListScrollComponent } from './components/community-item-list-scroll/community-item-list-scroll.component';
import { CommunityItemDetailComponent } from './components/community-item-detail/community-item-detail.component';

@NgModule({
  entryComponents: [
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    CommunityItemRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCardModule,
    MatRippleModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  declarations: [
    CommunityItemDetailComponent,
    CommunityItemDetailContainerComponent,
    CommunityItemListScrollComponent,
    CommunityItemCardComponent,
    CommunityItemListScrollContainerComponent
  ]
})
export class CommunityItemModule {
}
