import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Trip } from '../../../core/models/trip.model';
import { TripLog } from '../../../core/models/trip-log.model';
import { RootStoreState, TripLogStoreActions, TripLogStoreSelectors, AuthenticationStoreSelectors } from '../../../root-store';
import { TripLogEditorDialogComponent } from '../../components/trip-log-editor-dialog/trip-log-editor-dialog.component';
import { DateService } from '../../../core/services/date.service';

@Component({
  selector: 'app-trip-log-list-container',
  templateUrl: './trip-log-list-container.component.html',
  styleUrls: ['./trip-log-list-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripLogListContainerComponent implements OnInit, OnDestroy {
  @Input() trip: Trip;
  logs$: Observable<TripLog[]>;
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    private store$: Store<RootStoreState.State>,
    private dialog: MatDialog,
    private dateService: DateService
  ) {
  }

  ngOnInit() {
    this.store$.dispatch(new TripLogStoreActions.LoadManyAction({ pageIndex: null, tripId: this.trip.id }));
    this.logs$ = this.store$.select(TripLogStoreSelectors.selectAllTripLogItems);
    this.store$.select(AuthenticationStoreSelectors.selectUser).pipe(takeUntil(this.ngUnsubscribe)).subscribe
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '350px';
    let log: TripLog = {};
    log.logDate = this.dateService.currentDateTimeAsString();
    log.tripId = this.trip.id;
    log.userId = this.trip.creatorId;
    dialogConfig.data = log;
    const dialogRef = this.dialog.open(TripLogEditorDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if (data) {
        this.store$.dispatch(new TripLogStoreActions.CreateAction(<TripLog>data));
      }
    });    
  }

}
