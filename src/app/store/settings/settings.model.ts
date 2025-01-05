export interface Setting {
  autologin: boolean;
  loginMethod: 'email' | 'google' | null;
  colorMode: 'light' | 'dark' | 'auto';
  showPwaPopup: boolean;
}
