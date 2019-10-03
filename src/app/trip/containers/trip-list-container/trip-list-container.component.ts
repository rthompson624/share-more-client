import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';
import { Store } from '@ngrx/store';

import { Trip } from '../../../core/models/trip.model';
import { RootStoreState, TripStoreActions, TripStoreSelectors } from '../../../root-store';
import { Page } from '../../../core/models/page.model';

@Component({
  selector: 'app-trip-list-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-list-container.component.html',
  styleUrls: ['./trip-list-container.component.css']
})
export class TripListContainerComponent implements OnInit {
  columns: string[] = ['name', 'startDate'];
  trips$: Observable<Trip[]>;
  page$: Observable<Page>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.trips$ = this.store$.select(TripStoreSelectors.selectAllTripItems);
    this.page$ = this.store$.select(TripStoreSelectors.selectTripPage);
    this.loadTrips(null); // Null signifies use page in store
  }

  selectTrip(trip: Trip): void {
    this.store$.dispatch(new TripStoreActions.SelectOneAction(trip));
    this.router.navigate([trip.id.toString(10)], {relativeTo: this.route});
  }

  createNew(): void {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  onLoad(event: PageEvent) {
    this.loadTrips(event.pageIndex);
  }

  private loadTrips(pageIndex: number): void {
    this.store$.dispatch(
      new TripStoreActions.LoadManyAction({pageIndex: pageIndex})
    );
  }

}
