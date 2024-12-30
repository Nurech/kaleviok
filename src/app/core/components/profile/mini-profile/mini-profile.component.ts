import { Component } from '@angular/core';
import {
  MatCardModule,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-mini-profile',
  standalone: true,
  imports: [MatCardModule, MatButton],
  templateUrl: './mini-profile.component.html',
  styleUrl: './mini-profile.component.scss',
})
export class MiniProfileComponent {}
