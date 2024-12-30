import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { selectAuthAccount } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-mini-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    MatIcon,
    MatFabButton,
    TranslatePipe,
    MatIconButton,
    AsyncPipe,
    NgStyle,
    NgIf,
    RouterLink,
  ],
  templateUrl: './mini-profile.component.html',
  styleUrl: './mini-profile.component.scss',
})
export class MiniProfileComponent {
  store$ = inject(Store);
  account$ = this.store$.select(selectAuthAccount);
}
