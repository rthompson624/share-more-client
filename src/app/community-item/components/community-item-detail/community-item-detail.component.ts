import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Item } from 'src/app/core/models/item.model';
import { DateService } from 'src/app/core/services/date.service';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-community-item-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './community-item-detail.component.html',
  styleUrls: ['./community-item-detail.component.css']
})
export class CommunityItemDetailComponent implements OnInit {
  @Input() item: Item;
  @Output() navigateToList = new EventEmitter<void>();

  constructor(
    public dateService: DateService,
    public mediaService: MediaService
  ) {
  }

  ngOnInit() {
  }

}
