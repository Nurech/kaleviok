import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgStyle } from '@angular/common';
import { Account } from '../../../store/accounts/account.model';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [MatIcon, NgIf, NgStyle],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent implements OnInit {
  @Input() account!: Account;

  initials = '';
  backgroundColor = '';
  textColor = '';

  ngOnInit(): void {
    this.extractInitials();
    this.generateColors();
  }

  private extractInitials(): void {
    const firstInitial = this.account?.firstName?.charAt(0) || '';
    const lastInitial = this.account?.lastName?.charAt(0) || '';
    this.initials = (firstInitial + lastInitial).toUpperCase();
  }

  private generateColors(): void {
    if (!this.initials) {
      this.backgroundColor = '#aaa';
      this.textColor = '#fff';
      return;
    }

    const charCodeSum = this.initials.charCodeAt(0) + (this.initials.charCodeAt(1) || 0);
    const hue = (charCodeSum * 37) % 360;
    this.backgroundColor = `hsl(${hue}, 70%, 50%)`;
    this.textColor = hue > 180 ? '#fff' : '#000';
  }
}
