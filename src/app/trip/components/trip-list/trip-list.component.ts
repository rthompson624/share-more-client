import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Trip } from '../../../core/models/trip.model';
import { Page } from '../../../core/models/page.model';
import { DateService } from '../../../core/services/date.service';

@Component({
  selector: 'app-trip-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  @Input() trips: Trip[];
  @Input() pageInfo: Page;
  @Input() displayedColumns: string[];
  @Output() clickRow = new EventEmitter<Trip>();
  @Output() load = new EventEmitter<PageEvent>();

  constructor(
    public dateService: DateService
  ) { }

  ngOnInit() {
  }

  rowClick(trip: Trip) {
    this.clickRow.emit(trip);
  }

  onPageEvent(event: PageEvent) {
    this.load.emit(event);
  }

}
