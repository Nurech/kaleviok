import { AsyncPipe, NgClass } from '@angular/common';
import { Component, computed, inject, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DarkModeSwitchComponent } from '../../../shared/components/dark-mode-switch/dark-mode-switch.component';
import { MenuService } from '../../../shared/services/menu.service';
import { TranslatePipe } from '@ngx-translate/core';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    AsyncPipe,
    DarkModeSwitchComponent,
    TranslatePipe,
    NgClass,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => open', [
        query(
          'a',
          [
            style({ opacity: 0, transform: 'translateX(30px)' }),
            stagger(50, [
              animate(
                '200ms ease-out',
                style({ opacity: 1, transform: 'translateX(0)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent {
  closeDrawer = output();
  readonly menuItems = inject(MenuService).rootMenuItems;
  public isOpen = signal(false);
  animationState = computed(() => (this.isOpen() ? 'open' : ''));
}
