import { MatSnackBar } from '@angular/material/snack-bar';

export enum SnackbarType {
  INFO = 'info',
  SUCCESS = 'success',
  WARN = 'warn',
  ERROR = 'error',
}

export enum SnackbarActions {
  CLOSE = 'close',
}

export class Snackbar {
  self?: MatSnackBar;
  type?: SnackbarType = SnackbarType.INFO;
  message?: string;
  action?: string;
  duration?: number = 30000;

  constructor(type?: SnackbarType, message?: string, duration?: number, self?: MatSnackBar, action?: string) {
    this.message = message;
    this.type = type;
    this.duration = duration;
    this.self = self;
    this.action = action;
  }
}
