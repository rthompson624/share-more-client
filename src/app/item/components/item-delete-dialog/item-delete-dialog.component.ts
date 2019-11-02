import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from '../../../core/models/item.model';

@Component({
  selector: 'app-item-delete-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-delete-dialog.component.html',
  styleUrls: ['./item-delete-dialog.component.css']
})
export class ItemDeleteDialogComponent implements OnInit {
  item: Item;

  constructor(
    private dialogRef: MatDialogRef<ItemDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.item = data;
  }

  ngOnInit() {
  }

  delete() {
    this.dialogRef.close(this.item);
  }

  cancel() {
    this.dialogRef.close();
  }

}
