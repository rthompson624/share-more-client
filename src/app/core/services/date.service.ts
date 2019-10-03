import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class DateService {

  constructor(
  ) {
  }

  formatDate(value: string): string {
    if (value) {
      const date = moment(value, 'YYYY-MM-DD', true);
      return date.format('M/D/YY');
    } else {
      return '';
    }
  }

  formatDateTimeLong(value: string): string {
    if (value) {
      const date = moment(value);
      return date.format('dddd, MMM Do YYYY, h:mm a');
    } else {
      return '';
    }
  }

  currentDateTimeAsString(): string {
    return moment().toISOString();
  }

}
