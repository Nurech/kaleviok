import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { InfoComponent } from '../../../shared/components/info/info.component';
import { DialogService } from '../../../shared/services/dialog.service';
import { BackgroundIconDirective } from '../../../shared/directives/background-icon.directive';

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
        BackgroundIconDirective
    ],
    templateUrl: './pwa-update-dialog.component.html',
    styleUrls: ['./pwa-update-dialog.component.scss']
})
export class PwaUpdateDialogComponent {
    dialogService = inject(DialogService);
    data: { currentVersion: string; newVersion: string } = inject(MAT_DIALOG_DATA);

    onReload(): void {
        window.location.reload();
    }

    onDismiss(): void {
        this.dialogService.close(PwaUpdateDialogComponent);
    }
}
