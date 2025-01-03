import { ColorMode } from '../../shared/services/theme-changer.service';

export enum LoginMethod {
  Email = 'email',
  Google = 'google.com',
}

export class Setting {
  uid: string;
  autologin: boolean;
  loginMethod: LoginMethod | null;
  colorMode: ColorMode;
  showPwaPopup: boolean;

  constructor(data?: Partial<Setting>) {
    this.uid = data?.uid || '';
    this.autologin = data?.autologin ?? false;
    this.loginMethod = data?.loginMethod || null;
    this.colorMode = data?.colorMode || 'auto';
    this.showPwaPopup = data?.showPwaPopup ?? true;
  }
}
