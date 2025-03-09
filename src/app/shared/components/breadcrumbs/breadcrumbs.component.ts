import { Component, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { isAtRoot } from '../../../store/router/router.selectors';
import { navigateBack } from '../../../store/router/router.actions';

@Component({
    selector: 'app-breadcrumbs',
    standalone: true,
    templateUrl: './breadcrumbs.component.html',
    styleUrl: './breadcrumbs.component.scss',
    imports: [MatIcon, RouterLink]
})
export class BreadcrumbsComponent {
    private store$ = inject(Store);
    isAtRoot$ = toSignal(this.store$.pipe(select(isAtRoot)));

    onNavigateBack() {
        this.store$.dispatch(navigateBack());
    }
}
