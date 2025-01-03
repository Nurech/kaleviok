import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { InfoComponent } from '../../../shared/components/info/info.component';
import { DialogService } from '../../../shared/services/dialog.service';

@Component({
  selector: 'app-pwa-update-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatIcon,
    InfoComponent,
    TranslatePipe,
  ],
  templateUrl: './pwa-update-dialog.component.html',
  styleUrl: './pwa-update-dialog.component.scss',
})
export class PwaUpdateDialogComponent {
  private dialogService = inject(DialogService);
  onReload(): void {
    window.location.reload();
  }

  onDismiss(): void {
    this.dialogService.close(PwaUpdateDialogComponent);
  }
}
