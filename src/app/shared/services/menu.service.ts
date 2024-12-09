import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {goTo} from '../../utils';

export interface MenuItem {
  label: string;
  icon: string;
  href?: string;
  onClick?: () => void;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private dialog = inject(MatDialog);

  readonly rootMenuItems: MenuItem[] = [
    {
      label: 'Themes',
      icon: 'palette',
      href: '/',
    },
    {
      label: 'Get Code',
      icon: 'code',
      onClick() {
        goTo('https://store.angular-material.dev');
      },
    },
    {
      label: 'Main Site',
      icon: 'home',
      onClick() {
        goTo('https://angular-material.dev');
      },
    },
  ];
}
