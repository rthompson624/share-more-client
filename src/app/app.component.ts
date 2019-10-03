import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, AuthenticationStoreActions } from './root-store';
import { ConfigService } from './core/services/config.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private configService: ConfigService,
    private store$: Store<RootStoreState.State>
  ) { }

  ngOnInit() {
    this.configService.loadData();
    this.store$.dispatch(new AuthenticationStoreActions.RestoreAuthenticationStateRequestAction());
  }

}
