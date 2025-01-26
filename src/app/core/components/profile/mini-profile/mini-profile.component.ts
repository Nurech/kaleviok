import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { selectAuthAccount } from '../../../../store/auth/auth.selectors';
import { LogoutDialogComponent } from '../../logout-dialog/logout-dialog.component';
import { DialogService } from '../../../../shared/services/dialog.service';
import { DrawerService } from '../../../../shared/services/drawer.service';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';

@Component({
    selector: 'app-mini-profile',
    standalone: true,
    imports: [MatCardModule, MatIcon, MatIconButton, AsyncPipe, AvatarComponent],
    templateUrl: './mini-profile.component.html',
    styleUrl: './mini-profile.component.scss'
})
export class MiniProfileComponent {
    store$ = inject(Store);
    router = inject(Router);
    dialogService = inject(DialogService);
    account$ = this.store$.select(selectAuthAccount);
    drawerService = inject(DrawerService);

    onLogout() {
        this.dialogService.open(LogoutDialogComponent);
    }

    async onSettingsClick() {
        this.drawerService.close();
        const account = await firstValueFrom(this.account$);
        if (account?.uid) {
            await this.router.navigate(['/account'], {
                queryParams: {
                    accountId: account.uid
                }
            });
        }
    }

    onNotifications() {
        this.drawerService.close();
        this.router.navigate(['/notifications']);
    }
}
