import { Component, input, effect } from '@angular/core';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Account } from '../../../store/accounts/account.model';

@Component({
    selector: 'app-avatar',
    standalone: true,
    imports: [NgStyle, RouterLink, TranslatePipe],
    templateUrl: './avatar.component.html',
    styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
    account = input.required<Account | null>();
    initials = '';
    backgroundColor = '';
    textColor = '';

    constructor() {
        effect(() => {
            const acc = this.account();
            if (acc) {
                this.extractInitials(acc);
                this.generateColorsFromUID(acc);
            }
        });
    }

    private extractInitials(account: Account): void {
        const firstInitial = account?.firstName?.charAt(0) || '';
        const lastInitial = account?.lastName?.charAt(0) || '';
        this.initials = (firstInitial + lastInitial).toUpperCase();
    }

    private generateColorsFromUID(account: Account): void {
        if (!account?.uid) {
            this.backgroundColor = '#aaa';
            this.textColor = '#fff';
            return;
        }

        const uidString = account.uid;
        let hash = 0;
        for (let i = 0; i < uidString.length; i++) {
            hash = uidString.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = Math.abs(hash % 360);
        this.backgroundColor = `hsl(${hue}, 70%, 50%)`;
        this.textColor = hue > 180 ? '#fff' : '#000';
    }
}
