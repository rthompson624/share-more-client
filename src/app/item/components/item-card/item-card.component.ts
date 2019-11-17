import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/core/models/item.model';
import { MediaService } from 'src/app/core/services/media.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;
  @Input() owner: User;
  @Output() showDetail = new EventEmitter<void>();

  constructor(
    public mediaService: MediaService
  ) {
  }

  ngOnInit() {
  }

}
