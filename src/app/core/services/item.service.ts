import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { ApiPage } from '../models/api-page.model';
import { Item } from '../models/item.model';
import { ConfigService } from '../services/config.service';

@Injectable({
  providedIn: CoreModule
})
export class ItemService {
  private apiEndpoint = 'items';
  private pageSize = 8;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
  }

  create(item: Item): Observable<Item> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.post<Item>(config.apiServer + '/' + this.apiEndpoint, item, options);
    }));
  }

  update(item: Item): Observable<Item> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.put<Item>(config.apiServer + '/' + this.apiEndpoint + '/' + item._id, item, options);
    }));
  }

  getOne(id: string): Observable<Item> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.get<Item>(config.apiServer + '/' + this.apiEndpoint + '/' + id, options);
    }));
  }

  getMany(pageIndex: number, creatorId?: string): Observable<ApiPage<Item>> {
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
      return this.httpClient.get<ApiPage<Item>>(config.apiServer + '/' + this.apiEndpoint, options);
    }));
  }

  delete(item: Item): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.delete<void>(config.apiServer + '/' + this.apiEndpoint + '/' + item._id, options);
    }));
  }

}
