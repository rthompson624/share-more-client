import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { Multiple } from '../models/multiple.model';
import { Trip } from '../models/trip.model';
import { ConfigService } from '../services/config.service';

@Injectable({
  providedIn: CoreModule
})
export class TripService {
  private apiEndpoint: string = 'trips';
  private pageSize: number = 8;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
  }

  create(trip: Trip): Observable<Trip> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.post<Trip>(config.apiServer + '/' + this.apiEndpoint, trip, options);
    }));
  }

  update(trip: Trip): Observable<Trip> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.put<Trip>(config.apiServer + '/' + this.apiEndpoint + '/' + trip.id, trip, options);
    }));
  }

  getOne(id: number): Observable<Trip> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.get<Trip>(config.apiServer + '/' + this.apiEndpoint + '/' + id, options);
    }));
  }

  getMany(pageIndex: number, creatorId?: string): Observable<Multiple<Trip>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const skip = (pageIndex * this.pageSize);
    let params: HttpParams;
    if (creatorId) {
      params = new HttpParams()
        .set('$skip', skip.toString(10))
        .set('$limit', this.pageSize.toString(10))
        .set('$sort[startDate]', '-1')
        .set('creatorId', String(creatorId));
    } else {
      params = new HttpParams()
        .set('$skip', skip.toString(10))
        .set('$limit', this.pageSize.toString(10));
    }
    const options = {headers: headers, params: params};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.get<Multiple<Trip>>(config.apiServer + '/' + this.apiEndpoint, options);
    }));
  }

  delete(trip: Trip): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.delete<void>(config.apiServer + '/' + this.apiEndpoint + '/' + trip.id, options);
    }));
  }

}
