export enum SnackbarType {
  AUTOLOGIN = 'autologin',
}

export enum SnackbarState {
  SUCCESS = 'success',
  INDETERMINATE = 'indeterminate',
  ERROR = 'error',
}

export interface Snackbar {
  name: SnackbarType;
  show: boolean;
  state: SnackbarState;
  message: string;
  action?: string;
  type?: string;
}
