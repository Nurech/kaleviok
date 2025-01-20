import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { Account } from '../../../store/accounts/account.model';

@Component({
    selector: 'app-avatar',
    standalone: true,
    imports: [NgIf, NgStyle],
    templateUrl: './avatar.component.html',
    styleUrl: './avatar.component.scss'
})
export class AvatarComponent implements OnInit {
    @Input() account!: Account;

    initials = '';
    backgroundColor = '';
    textColor = '';

    ngOnInit(): void {
        this.extractInitials();
        this.generateColorsFromUID();
    }

    private extractInitials(): void {
        const firstInitial = this.account?.firstName?.charAt(0) || '';
        const lastInitial = this.account?.lastName?.charAt(0) || '';
        this.initials = (firstInitial + lastInitial).toUpperCase();
    }

    private generateColorsFromUID(): void {
        if (!this.account?.uid) {
            this.backgroundColor = '#aaa';
            this.textColor = '#fff';
            return;
        }

        const uidString = this.account.uid;
        let hash = 0;
        for (let i = 0; i < uidString.length; i++) {
            hash = uidString.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = Math.abs(hash % 360);
        this.backgroundColor = `hsl(${hue}, 70%, 50%)`;
        this.textColor = hue > 180 ? '#fff' : '#000';
    }
}
