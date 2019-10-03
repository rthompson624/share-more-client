import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Trip } from '../../../core/models/trip.model';

@Component({
  selector: 'app-trip-delete-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-delete-dialog.component.html',
  styleUrls: ['./trip-delete-dialog.component.css']
})
export class TripDeleteDialogComponent implements OnInit {
  trip: Trip;

  constructor(
    private dialogRef: MatDialogRef<TripDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.trip = data;
  }

  ngOnInit() {
  }

  delete() {
    this.dialogRef.close(this.trip);
  }

  cancel() {
    this.dialogRef.close();
  }

}
