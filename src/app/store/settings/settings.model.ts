export interface Setting {
  autologin: boolean;
  loginMethod: 'email' | 'google.com' | 'firebase' | null;
  colorMode: 'light' | 'dark' | 'auto';
  showPwaPopup: boolean;
}
