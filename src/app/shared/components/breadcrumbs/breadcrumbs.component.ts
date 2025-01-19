import { Component, Input, Signal, computed, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgForOf, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { selectRouter } from '../../../store/router/router.selectors';

@Component({
    selector: 'app-breadcrumbs',
    standalone: true,
    templateUrl: './breadcrumbs.component.html',
    styleUrl: './breadcrumbs.component.scss',
    imports: [NgForOf, MatIcon, NgIf, RouterLink]
})
export class BreadcrumbsComponent {
    @Input() maxCrumbs = 5; // Set a max limit for breadcrumbs
    store$ = inject(Store);

    private routerState = toSignal(this.store$.pipe(select(selectRouter)), { initialValue: null });
    breadcrumbs: Signal<{ label: string; url: string }[]> = computed(() => {
        const state = this.routerState()?.state;
        if (!state) return [];

        const segments = state.url.split('/').filter((segment: any) => segment);
        let fullPath = '';
        const crumbs = segments.map((segment: any) => {
            fullPath += `/${segment}`;
            return { label: segment, url: fullPath };
        });

        return this.formatCrumbs(crumbs);
    });

    private formatCrumbs(crumbs: { label: string; url: string }[]): { label: string; url: string }[] {
        if (crumbs.length <= this.maxCrumbs) return crumbs;

        const first = crumbs[0];

        return [
            first,
            { label: '...', url: '' },
            ...crumbs.slice(-this.maxCrumbs + 2) // Keep last few items
        ];
    }
}
