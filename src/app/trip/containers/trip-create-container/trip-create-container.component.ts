import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Trip } from '../../../core/models/trip.model';
import { RootStoreState, TripStoreActions } from '../../../root-store';

@Component({
  selector: 'app-trip-create-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-create-container.component.html',
  styleUrls: ['./trip-create-container.component.css']
})
export class TripCreateContainerComponent implements OnInit {
  trip: Trip = {
    name: null,
    creatorId: null
  };

  constructor(
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
  }

  onSave(trip: Trip): void {
    this.store$.dispatch(new TripStoreActions.CreateAction(trip));
  }

}
