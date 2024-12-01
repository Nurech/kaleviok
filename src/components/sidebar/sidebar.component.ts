import { Component } from '@angular/core';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    LoginComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
