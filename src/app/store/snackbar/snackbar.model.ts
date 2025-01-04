export interface Snackbar {
  type?: 'info' | 'success' | 'warn' | 'error';
  message?: string;
  action?: 'link' | 'close';
  link?: string;
  actionText?: string;
  duration?: number;
}
