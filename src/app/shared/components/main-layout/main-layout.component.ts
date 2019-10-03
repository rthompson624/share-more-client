import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootStoreState, RootStoreSelectors, AuthenticationStoreActions, AuthenticationStoreSelectors } from '../../../root-store';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-main-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  user$: Observable<User>;
  accessToken$: Observable<string>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(
    private store$: Store<RootStoreState.State>
  ) { }

  ngOnInit() {
    this.user$ = this.store$.select(AuthenticationStoreSelectors.selectUser);
    this.accessToken$ = this.store$.select(AuthenticationStoreSelectors.selectAccessToken);
    this.isLoading$ = this.store$.select(RootStoreSelectors.selectIsLoading);
    this.errorMessage$ = this.store$.select(RootStoreSelectors.selectError);
  }

  onLogout(): void {
    this.store$.dispatch(new AuthenticationStoreActions.LogoutRequestAction());
  }

}
