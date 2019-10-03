import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { ConfigVariables } from '../models/config-variables.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: CoreModule
})
export class ConfigService {
  private configSubject: ReplaySubject<ConfigVariables> = new ReplaySubject<ConfigVariables>(1);

  constructor(private httpClient: HttpClient) {
  }

  // Call this method proactively in app to initiate loading of config variables
  loadData(): void {
    this.getConfigVariables().pipe(take(1)).subscribe(config => {
      this.configSubject.next(config);
    });
  }

  getConfig(): Observable<ConfigVariables> {
    return this.configSubject.asObservable();
  }

  private getConfigVariables(): Observable<ConfigVariables> {
    if (environment.production) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const options = {headers: headers};
      return this.httpClient.get<ConfigVariables>('/config-variables', options);
    } else {
      return of(environment.devConfigVariables);
    }
  }

}
