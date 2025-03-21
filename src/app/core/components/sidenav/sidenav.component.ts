import { NgComponentOutlet } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { MenuService } from '../../../shared/services/menu.service';
import { DrawerService } from '../../../shared/services/drawer.service';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, MatIconModule, TranslatePipe, NgComponentOutlet],
    templateUrl: './sidenav.component.html',
    animations: [
        trigger('listAnimation', [
            transition('* => open', [
                query(
                    'a',
                    [
                        style({ opacity: 0, transform: 'translateX(30px)' }),
                        stagger(40, [animate('150ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))])
                    ],
                    { optional: true }
                )
            ])
        ])
    ]
})
export class SidenavComponent {
    private menuService = inject(MenuService);
    private drawerService = inject(DrawerService);
    menuItems = this.menuService.rootMenuItems;
    animationState = computed(() => (this.drawerService.isOpen() ? 'open' : ''));

    onClick() {
        this.drawerService.close();
    }
}
