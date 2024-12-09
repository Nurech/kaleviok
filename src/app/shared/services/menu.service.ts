import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {goTo} from '../../utils';

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
      label: 'Themes',
      icon: 'palette',
      href: '/',
    },
    {
      label: 'Get Code',
      icon: 'code',
      onClick() {
        goTo('https://');
      },
    },
    {
      label: 'Main Site',
      icon: 'home',
      onClick() {
        goTo('https://');
      },
    },
  ];
  private dialog = inject(MatDialog);
}
