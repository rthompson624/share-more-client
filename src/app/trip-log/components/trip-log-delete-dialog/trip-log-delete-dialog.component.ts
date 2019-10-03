import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TripLog } from '../../../core/models/trip-log.model';
import { DateService } from '../../../core/services/date.service';

@Component({
  selector: 'app-trip-log-delete-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-log-delete-dialog.component.html',
  styleUrls: ['./trip-log-delete-dialog.component.css']
})
export class TripLogDeleteDialogComponent implements OnInit {
  log: TripLog;

  constructor(
    public dateService: DateService,
    private dialogRef: MatDialogRef<TripLogDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.log = data;
  }

  ngOnInit() {
  }

  delete() {
    this.dialogRef.close(this.log);
  }

  cancel() {
    this.dialogRef.close();
  }

}
