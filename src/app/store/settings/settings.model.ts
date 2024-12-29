import { ColorMode } from '../../shared/services/theme-changer.service';

export class Setting {
  uid: string;
  autologin: boolean;
  loginMethod: 'email' | 'google';
  colorMode: ColorMode;
  showPwaPopup: boolean;

  constructor(data?: Partial<Setting>) {
    this.uid = data?.uid || '';
    this.autologin = data?.autologin ?? false;
    this.loginMethod = data?.loginMethod || 'email';
    this.colorMode = data?.colorMode || 'auto';
    this.showPwaPopup = data?.showPwaPopup ?? true;
  }
}
