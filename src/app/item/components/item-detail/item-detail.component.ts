import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Item } from '../../../core/models/item.model';
import { ItemDeleteDialogComponent } from '../item-delete-dialog/item-delete-dialog.component';
import { DateService } from '../../../core/services/date.service';
import { MediaService } from '../../../core/services/media.service';

@Component({
  selector: 'app-item-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  @Input() item: Item;
  @Output() editItem = new EventEmitter<Item>();
  @Output() deleteItem = new EventEmitter<Item>();
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    public dateService: DateService,
    public mediaService: MediaService
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
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
    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if (data) {
        this.deleteItem.emit(this.item);
      }
    });
  }

}
