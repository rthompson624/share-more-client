import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState, RootStoreSelectors, AuthenticationStoreActions, AuthenticationStoreSelectors } from '../../../root-store';

@Component({
  selector: 'app-site-layout',
  templateUrl: 'site-layout.component.html',
  styleUrls: ['site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  accessToken$: Observable<string>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private store$: Store<RootStoreState.State>
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.accessToken$ = this.store$.select(AuthenticationStoreSelectors.selectAccessToken);
    this.isLoading$ = this.store$.select(RootStoreSelectors.selectIsLoading);
    this.errorMessage$ = this.store$.select(RootStoreSelectors.selectError);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  onLogout(): void {
    this.store$.dispatch(AuthenticationStoreActions.logout());
  }

}
