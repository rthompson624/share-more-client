import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { RootStoreState, AuthenticationStoreActions, AuthenticationStoreSelectors } from '../../../root-store';

@Component({
  selector: 'app-create-account',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  accountForm: FormGroup;
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private store$: Store<RootStoreState.State>,
    private actions$: Actions
  ) {
  }

  ngOnInit() {
    this.createaccountForm();
    this.registerListeners();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  onSubmit(): void {
    const email = <string>this.accountForm.controls['email'].value;
    const password = <string>this.accountForm.controls['password'].value;
    this.store$.dispatch(new AuthenticationStoreActions.CreateAccountRequestAction({
      email: email,
      password: password
    }));
  }

  registerListeners(): void {
    // Subscribe to CREATE_ACCOUNT_SUCCESS action
    this.actions$.pipe(
      ofType<AuthenticationStoreActions.CreateAccountSuccessAction>(AuthenticationStoreActions.ActionTypes.CREATE_ACCOUNT_SUCCESS),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
      // Log user in
      const email = <string>this.accountForm.controls['email'].value;
      const password = <string>this.accountForm.controls['password'].value;
      this.store$.dispatch(new AuthenticationStoreActions.LoginRequestAction({
        email: email,
        password: password
      }));
    });
  }

  private createaccountForm(): void {
    this.accountForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordEnterAgain: ['', [Validators.required, Validators.minLength(6)]]
      },
      {
        validator: this.validatePasswordConfirmation
      }
    );
  }

  validatePasswordConfirmation(fg: FormGroup): ValidationErrors {
    const pw = fg.controls['password'];
    const pw2 = fg.controls['passwordEnterAgain'];
    if (pw.value !== pw2.value) {
      pw2.setErrors({validatePasswordConfirmation: true});
    } else {
      pw2.setErrors(null);
    }
    return null; 
  }

}