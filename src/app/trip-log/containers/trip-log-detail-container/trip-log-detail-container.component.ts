import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootStoreState, AuthenticationStoreSelectors, TripLogStoreActions } from '../../../root-store';
import { TripLog } from '../../../core/models/trip-log.model';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-trip-log-detail-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-log-detail-container.component.html',
  styleUrls: ['./trip-log-detail-container.component.css']
})
export class TripLogDetailContainerComponent implements OnInit {
  @Input() log: TripLog;
  user$: Observable<User>;

  constructor(
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.user$ = this.store$.select(AuthenticationStoreSelectors.selectUser);
  }

  updateLog(log: TripLog): void {
    this.store$.dispatch(new TripLogStoreActions.UpdateAction(log));
  }

  deleteLog(log: TripLog): void {
    this.store$.dispatch(new TripLogStoreActions.DeleteAction(log));
  }

}
