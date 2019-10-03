import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootStoreState, AuthenticationStoreSelectors, AuthenticationStoreActions } from '../../../root-store';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-detail-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-detail-container.component.html',
  styleUrls: ['./user-detail-container.component.css']
})
export class UserDetailContainerComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.user$ = this.store$.select(AuthenticationStoreSelectors.selectUser);
  }

  updateUser(user: User): void {
    this.store$.dispatch(new AuthenticationStoreActions.UpdateUserRequestAction(user));
  }

}
