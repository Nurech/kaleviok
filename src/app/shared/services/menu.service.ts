import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {navigateTo, openBottomSheet} from '../../store/core/core.actions';
import {LoginComponent} from '../../core/components/login/login.component';

export interface MenuItem {
  label: string;
  icon: string;
  href?: string;
  onClick?: () => void;
}

@Injectable({providedIn: 'root'})
export class MenuService {
  readonly rootMenuItems: MenuItem[] = [
    {
      label: 'login',
      icon: 'login',
      onClick: () => this.store.dispatch(openBottomSheet({component: 'LoginComponent'})),
    },
    {
      label: 'users',
      icon: 'group',
      onClick: () => this.handleNavigation('/users'),
    },
    {
      label: 'admin_panel_settings',
      icon: 'admin_panel_settings',
      onClick: () => this.handleNavigation('/admin-panel-settings'),
    },
    {
      label: 'contact_support',
      icon: 'contact_support',
      onClick: () => this.handleNavigation('/contact-support'),
    },
  ];

  private store = inject(Store);

  private handleNavigation(path: string): void {
    this.store.dispatch(navigateTo({path}));
  }
}
