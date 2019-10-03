import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Trip } from '../../../core/models/trip.model';
import { RootStoreState, TripStoreActions, TripStoreSelectors } from '../../../root-store';

@Component({
  selector: 'app-trip-edit-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-edit-container.component.html',
  styleUrls: ['./trip-edit-container.component.css']
})
export class TripEditContainerComponent implements OnInit {
  trip$: Observable<Trip>;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.trip$ = this.route.paramMap.pipe(
      switchMap(paramMap => {
        this.store$.dispatch(new TripStoreActions.LoadOneAction({ id: parseInt(paramMap.get('id'))}));
        return this.store$.select(TripStoreSelectors.selectTripById(parseInt(paramMap.get('id'))));
      })
    );
  }

  onSave(trip: Trip): void {
    this.store$.dispatch(new TripStoreActions.UpdateAction(trip));
  }

}
