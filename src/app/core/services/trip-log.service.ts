import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { Multiple } from '../models/multiple.model';
import { TripLog } from '../models/trip-log.model';
import { ConfigService } from '../services/config.service';

@Injectable({
  providedIn: CoreModule
})
export class TripLogService {
  private apiEndpoint: string = 'triplogs';
  private pageSize: number = 50;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
  }

  create(triplog: TripLog): Observable<TripLog> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.post<TripLog>(config.apiServer + '/' + this.apiEndpoint, triplog, options);
    }));
  }

  update(triplog: TripLog): Observable<TripLog> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.put<TripLog>(config.apiServer + '/' + this.apiEndpoint + '/' + triplog.id, triplog, options);
    }));
  }

  getOne(id: number): Observable<TripLog> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.get<TripLog>(config.apiServer + '/' + this.apiEndpoint + '/' + id, options);
    }));
  }

  getMany(pageIndex: number, tripId: number): Observable<Multiple<TripLog>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const skip = (pageIndex * this.pageSize);
    let params: HttpParams;
    params = new HttpParams()
      .set('$skip', skip.toString(10))
      .set('$limit', this.pageSize.toString(10))
      .set('$sort[logDate]', '1')
      .set('tripId', String(tripId));
    const options = {headers: headers, params: params};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.get<Multiple<TripLog>>(config.apiServer + '/' + this.apiEndpoint, options);
    }));
  }

  delete(triplog: TripLog): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.delete<void>(config.apiServer + '/' + this.apiEndpoint + '/' + triplog.id, options);
    }));
  }

}
