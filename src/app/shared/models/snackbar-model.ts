import { MatSnackBar } from '@angular/material/snack-bar';

export enum SnackbarType {
  INFO = 'info',
  SUCCESS = 'success',
  WARN = 'warn',
  ERROR = 'error',
}

export interface SnackbarAction {
  type: string;
  link: string;
  buttonText: string;
}

export class Snackbar {
  self?: MatSnackBar;
  type?: SnackbarType = SnackbarType.INFO;
  message?: string;
  action?: SnackbarAction;
  duration?: number = 30000;

  constructor(type?: SnackbarType, message?: string, duration?: number, self?: MatSnackBar, action?: SnackbarAction) {
    this.message = message;
    this.type = type;
    this.duration = duration;
    this.self = self;
    this.action = action;
  }
}
