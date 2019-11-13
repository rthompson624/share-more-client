import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Item } from '../../../core/models/item.model';
import { Page } from '../../../core/models/page.model';

@Component({
  selector: 'app-item-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() items: Item[];
  @Input() pageInfo: Page;
  @Input() displayedColumns: string[];
  @Output() clickRow = new EventEmitter<Item>();
  @Output() load = new EventEmitter<PageEvent>();

  constructor(
  ) { }

  ngOnInit() {
  }

  rowClick(item: Item) {
    this.clickRow.emit(item);
  }

  onPageEvent(event: PageEvent) {
    this.load.emit(event);
  }

}
