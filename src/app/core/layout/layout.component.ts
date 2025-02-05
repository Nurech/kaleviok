import { Component, inject } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { DeviceService } from '../../shared/services/device.service';
import { selectLoading } from '../../store/core/core.selectors';
import { MenuService } from '../../shared/services/menu.service';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs/breadcrumbs.component';

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
        AsyncPipe,
        SidenavComponent,
        MatTabsModule,
        NgTemplateOutlet,
        RouterOutlet,
        TranslatePipe,
        MatProgressBar,
        BreadcrumbsComponent
    ]
})
export class LayoutComponent {
    private store$ = inject(Store);
    isHandheld = inject(DeviceService).isHandheld;
    menuService = inject(MenuService);
    isLoading$ = this.store$.select(selectLoading);
}
