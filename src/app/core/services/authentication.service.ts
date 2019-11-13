import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { AuthRequest } from '../models/auth-request.model';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';
import { ConfigService } from '../services/config.service';

@Injectable({
  providedIn: CoreModule
})
export class AuthenticationService {
  private apiEndpoint = 'auth/login';

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
  }

  authenticateUser(authReq: AuthRequest): Observable<AuthResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.configService.getConfig().pipe(switchMap(config => {
      return this.httpClient.post<AuthResponse>(config.apiServer + '/' + this.apiEndpoint, authReq, options).pipe(
        tap((authRes: AuthResponse) => {
          // Authentication succeeded
          this.saveInLocalStorage('accessToken', authRes.access_token);
          this.saveInLocalStorage('user', JSON.stringify({ id: authRes.user_id }));
        })
      );
    }));
  }

  userIsAuthenticated(): boolean {
    if (this.getAccessToken()) {
      return true;
    } else {
      return false;
    }
  }

  getAccessToken(): string {
    return this.retrieveInLocalStorage('accessToken');
  }

  getUser(): User {
    return JSON.parse(this.retrieveInLocalStorage('user'));
  }

  logoutUser(): void {
    this.deleteInLocalStorage('accessToken');
    this.deleteInLocalStorage('user');
  }

  updateUserInLocalStorage(user: User): void {
    this.deleteInLocalStorage('user');
    this.saveInLocalStorage('user', JSON.stringify(user));
  }

  private saveInLocalStorage(key: string, value: string): void {
    if (typeof(Storage) !== 'undefined') {
      // Browser supports LocalStorage
      window.localStorage.setItem(key, value);
    } else {
      // No support for LocalStorage
    }
  }

  private deleteInLocalStorage(key: string): void {
    if (typeof(Storage) !== 'undefined') {
      // Browser supports local storage
      window.localStorage.removeItem(key);
    } else {
      // No support for local storage
    }
  }

  private retrieveInLocalStorage(key: string): string {
    if (typeof(Storage) !== 'undefined') {
      // Browser supports local storage
      const value: string = window.localStorage.getItem(key);
      if (value) {
        return value;
      } else {
        return null;
      }
    } else {
      // No support for local storage
      return null;
    }
  }

}
