import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { User } from '../models/user.model';
import { ConfigService } from '../services/config.service';

@Injectable({
  providedIn: CoreModule
})
export class UserService {
  private apiEndpoint = 'users';

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
  }

  create(user: User): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.post<User>(config.apiServer + '/' + this.apiEndpoint, user, options);
    }));
  }

  getOne(id: string): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.get<User>(config.apiServer + '/' + this.apiEndpoint + '/' + id, options);
    }));
  }

  update(user: User): Observable<User> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.put<User>(
        config.apiServer + '/' + this.apiEndpoint + '/' + user._id, this.updateableProperties(user),
        options
      );
    }));
  }

  private updateableProperties(user: User): User {
    const userUpdate = {
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl
    };
    return userUpdate;
  }

}
