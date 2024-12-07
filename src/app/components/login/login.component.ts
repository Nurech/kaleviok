import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {startGmailAuthentication} from '../../store/core/core.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private store$: Store) {}

  loginWithGoogle() {
    this.store$.dispatch(startGmailAuthentication());
  }
}
