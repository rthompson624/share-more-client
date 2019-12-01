import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/core/models/item.model';
import { MediaService } from 'src/app/core/services/media.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-community-item-card',
  templateUrl: './community-item-card.component.html',
  styleUrls: ['./community-item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityItemCardComponent implements OnInit {
  @Input() item: Item;
  @Input() owner: User;
  @Output() showDetail = new EventEmitter<Item>();

  constructor(
    public mediaService: MediaService
  ) {
  }

  ngOnInit() {
  }

}
