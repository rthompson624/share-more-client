import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { TripLog } from '../../../core/models/trip-log.model';

@Component({
  selector: 'app-trip-log-list',
  templateUrl: './trip-log-list.component.html',
  styleUrls: ['./trip-log-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripLogListComponent implements OnInit {
  @Input() logs: TripLog[];

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
