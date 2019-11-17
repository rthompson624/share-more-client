import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Item } from 'src/app/core/models/item.model';
import { ItemDeleteDialogComponent } from '../item-delete-dialog/item-delete-dialog.component';
import { DateService } from 'src/app/core/services/date.service';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-item-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @Input() item: Item;
  @Output() editItem = new EventEmitter<Item>();
  @Output() deleteItem = new EventEmitter<Item>();
  @Output() navigateToList = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    public dateService: DateService,
    public mediaService: MediaService
  ) {
  }

  ngOnInit() {
  }

  onClickEdit(): void {
    this.editItem.emit(this.item);
  }

  onClickDelete(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.item;
    const dialogRef = this.dialog.open(ItemDeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.deleteItem.emit(this.item);
      }
    });
  }

}
