import { Component, Signal, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgForOf, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { selectBreadcrumbs } from '../../../store/router/router.selectors';

@Component({
    selector: 'app-breadcrumbs',
    standalone: true,
    templateUrl: './breadcrumbs.component.html',
    styleUrl: './breadcrumbs.component.scss',
    imports: [NgForOf, MatIcon, NgIf, RouterLink]
})
export class BreadcrumbsComponent {
    private store$ = inject(Store);
    breadcrumbs: Signal<
        {
            label: string;
            url: string;
        }[]
    > = toSignal(this.store$.pipe(select(selectBreadcrumbs)), { initialValue: [] });
}
