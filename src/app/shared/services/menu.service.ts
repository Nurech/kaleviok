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
      label: 'login',
      icon: 'login',
      onClick() {
        goTo('https://');
      },
    },
    {
      label: 'users',
      icon: 'group',
      onClick() {
        goTo('https://');
      },
    },
  ];
  private dialog = inject(MatDialog);
}
