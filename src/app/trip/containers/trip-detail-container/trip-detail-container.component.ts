import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Trip } from '../../../core/models/trip.model';
import { RootStoreState, TripStoreActions, TripStoreSelectors } from '../../../root-store';

@Component({
  selector: 'app-trip-detail-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-detail-container.component.html',
  styleUrls: ['./trip-detail-container.component.css']
})
export class TripDetailContainerComponent implements OnInit {
  trip$: Observable<Trip>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  editTrip(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteTrip(trip: Trip): void {
    this.store$.dispatch(new TripStoreActions.DeleteAction(trip));
  }

}
