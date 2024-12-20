import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {navigateTo, openBottomSheet} from '../../store/core/core.actions';
import {LoginComponent} from '../../core/components/login/login.component';

export interface MenuItem {
  label: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  position?: 'start' | 'end';
}

@Injectable({providedIn: 'root'})
export class MenuService {
  readonly rootMenuItems: MenuItem[] = [
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
      onClick: () => this.store.dispatch(openBottomSheet({component: 'LoginComponent'})),
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

  private store = inject(Store);

  private handleNavigation(path: string): void {
    this.store.dispatch(navigateTo({path}));
  }
}
