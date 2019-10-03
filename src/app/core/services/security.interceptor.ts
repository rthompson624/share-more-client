import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { first, switchMap } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';

import { RootStoreState } from '../../root-store';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(
    private store$: Store<RootStoreState.State>
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store$.pipe(
      first(),
      switchMap(store => {
        if (this.needsToken(request.url, request.method)) {
          request = request.clone({headers: request.headers.append('Authorization', 'bearer ' + store.authentication.accessToken)});
        }
        return next.handle(request);
      })
    );
  }

  private needsToken(url: string, method: string): boolean {
    let retVal = true;
    if (url.toLowerCase().includes('users') && method.toLowerCase().includes('post')) retVal = false;
    if (url.toLowerCase().includes('auth')) retVal = false;
    if (url.toLowerCase().includes('config-variables')) retVal = false;
    return retVal;
  }

}