import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { DeviceService } from '../../shared/services/device.service';
import { HeaderComponent } from '../components/header/header.component';
import { DrawerService } from '../../shared/services/drawer.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        SidenavComponent,
        MatTabsModule,
        RouterOutlet,
        HeaderComponent
    ]
})
export class LayoutComponent implements AfterViewInit {
    readonly drawer = viewChild.required(MatSidenav);
    drawerService = inject(DrawerService);
    isHandheld = inject(DeviceService).isHandheld;

    ngAfterViewInit() {
        this.drawerService.drawer = this.drawer();
    }
}
