import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { selectAuthAccount } from '../../../../store/auth/auth.selectors';
import { MenuService } from '../../../../shared/services/menu.service';
import { LogoutDialogComponent } from '../../logout-dialog/logout-dialog.component';
import { DialogService } from '../../../../shared/services/dialog.service';

@Component({
    selector: 'app-mini-profile',
    standalone: true,
    imports: [
        MatCardModule,
        MatButton,
        MatIcon,
        MatFabButton,
        TranslatePipe,
        MatIconButton,
        AsyncPipe,
        NgStyle,
        NgIf,
        RouterLink
    ],
    templateUrl: './mini-profile.component.html',
    styleUrl: './mini-profile.component.scss'
})
export class MiniProfileComponent {
    store$ = inject(Store);
    router = inject(Router);
    menuService = inject(MenuService);
    dialogService = inject(DialogService);
    account$ = this.store$.select(selectAuthAccount);

    onLogout() {
        this.dialogService.open(LogoutDialogComponent);
    }

    async onSettingsClick() {
        this.menuService.isDrawerOpen.set(false);
        const account = await firstValueFrom(this.account$);
        if (account?.uid) {
            await this.router.navigate(['/account'], {
                queryParams: {
                    id: account.uid
                }
            });
        }
    }

    onNotifications() {
        this.router.navigate(['/notifications']);
    }
}
