import { Component, inject } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ngx-translate/core';
import { MenuService } from '../../../shared/services/menu.service';
import { selectLoading } from '../../../store/core/core.selectors';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { DrawerService } from '../../../shared/services/drawer.service';

@Component({
    selector: 'app-header',
    imports: [NgTemplateOutlet, BreadcrumbsComponent, MatIconButton, MatIcon, AsyncPipe, MatProgressBar, TranslatePipe],
    templateUrl: './header.component.html',
    standalone: true,
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    private store$ = inject(Store);
    menuService = inject(MenuService);
    drawerService = inject(DrawerService);
    isLoading$ = this.store$.select(selectLoading);
}
