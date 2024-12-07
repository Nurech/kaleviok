import { Component } from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDivider} from '@angular/material/divider';
import {
  MatAnchor,
  MatButton,
  MatFabAnchor,
  MatFabButton,
  MatIconButton,
  MatMiniFabButton
} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIconModule,
    MatSlideToggleModule,
    MatDivider,
    MatAnchor,
    MatButton,
    MatIconButton,
    MatFabButton,
    MatMiniFabButton,
    MatFabAnchor,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
