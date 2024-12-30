import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { navigateTo } from '../../store/router/router.actions';
import { SheetService } from './sheet.service';
import { LoginComponent } from '../../core/components/login/login.component';

export interface MenuItem {
  label?: string;
  icon?: string;
  logo?: string;
  href?: string;
  onClick?: () => void;
  position?: 'start' | 'end';
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private store$ = inject(Store);
  private sheetService = inject(SheetService);

  readonly rootMenuItems: MenuItem[] = [
    {
      logo: 'logo.svg',
      position: 'start',
      onClick: () => this.handleNavigation('/'),
    },
    {
      label: 'notifications',
      icon: 'notifications',
      position: 'start',
      onClick: () => this.handleNavigation('/notifications'),
    },
    {
      label: 'dashboard',
      icon: 'team_dashboard',
      position: 'start',
      onClick: () => this.handleNavigation('/dashboard'),
    },
    {
      label: 'users',
      icon: 'group',
      position: 'start',
      onClick: () => this.handleNavigation('/users'),
    },
    {
      label: 'login',
      icon: 'login',
      position: 'end',
      onClick: () => this.sheetService.open(LoginComponent),
    },
    {
      label: 'admin_panel_settings',
      icon: 'admin_panel_settings',
      position: 'end',
      onClick: () => this.handleNavigation('/admin-panel-settings'),
    },
    {
      label: 'contact_support',
      icon: 'contact_support',
      position: 'end',
      onClick: () => this.handleNavigation('/contact-support'),
    },
  ];

  private handleNavigation(path: string): void {
    this.store$.dispatch(navigateTo({ path: [path] }));
  }
}
