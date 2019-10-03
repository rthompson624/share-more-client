import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TripLog } from '../../../core/models/trip-log.model';
import { TripLogEditorDialogComponent } from '../trip-log-editor-dialog/trip-log-editor-dialog.component';
import { TripLogDeleteDialogComponent } from '../trip-log-delete-dialog/trip-log-delete-dialog.component';
import { User } from '../../../core/models/user.model';
import { DateService } from '../../../core/services/date.service';
import { MediaService } from '../../../core/services/media.service';

@Component({
  selector: 'app-trip-log-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-log-detail.component.html',
  styleUrls: ['./trip-log-detail.component.css']
})
export class TripLogDetailComponent implements OnInit, OnDestroy {
  @Input() log: TripLog;
  @Input() user: User;
  @Output() updateItem = new EventEmitter<TripLog>();
  @Output() deleteItem = new EventEmitter<TripLog>();
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

  onEdit(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '350px';
    dialogConfig.data = this.log;
    const dialogRef = this.dialog.open(TripLogEditorDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if (data) {
        this.updateItem.emit(<TripLog>data);
      }
    });    
  }

  onDelete(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '350px';
    dialogConfig.data = this.log;
    const dialogRef = this.dialog.open(TripLogDeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if (data) {
        this.deleteItem.emit(<TripLog>data);
      }
    });    
  }

}
