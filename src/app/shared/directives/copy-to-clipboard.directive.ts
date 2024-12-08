import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { Directive, inject, input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[libCopyToClipboard]',
  standalone: true,
  hostDirectives: [
    {
      directive: CdkCopyToClipboard,
      inputs: ['cdkCopyToClipboard:libCopyToClipboard'],
      outputs: ['cdkCopyToClipboardCopied:libCopyToClipboardCopied'],
    },
  ],
})
export class CopyToClipboardDirective {
  libCopyToClipboard = input.required<string>();
  snackBarText = input<string>('', { alias: 'libCopyToClipboardSnackBarText' });

  private cdkCopyToClipboard = inject(CdkCopyToClipboard);
  private snackbar = inject(MatSnackBar);

  constructor() {
    this.cdkCopyToClipboard.copied.subscribe((copied) => {
      if (copied) {
        this.snackbar.open(
          `Copied ${
            this.snackBarText()
              ? this.snackBarText()
              : this.libCopyToClipboard()
          } to clipboard!`,
          undefined,
          { duration: 3000 }
        );
      } else {
        this.snackbar.open('Please try after some time');
      }
    });
  }
}
