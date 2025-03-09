import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import {
    isAtCreatedEvents,
    isCreatingEvent,
    isAtPastEvents,
    isAtUpcomingEvents,
    isAtEvent
} from '../../../store/router/router.selectors';
import { DialogService } from '../../../shared/services/dialog.service';
import { EventsCalendarComponent } from './events-calendar/events-calendar.component';
import { EventsListComponent } from './events-list/events-list.component';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    standalone: true,
    imports: [
        MatTabGroup,
        NgIf,
        MatIcon,
        AsyncPipe,
        MatTab,
        TranslatePipe,
        RouterOutlet,
        MatButton,
        RouterLink,
        EventsListComponent
    ],
    styleUrl: './events.component.scss'
})
export class EventsComponent {
    private store$ = inject(Store);
    private router = inject(Router);
    private dialogService = inject(DialogService);

    isUpcoming$: Observable<boolean> = this.store$.pipe(select(isAtUpcomingEvents));
    isPast$: Observable<boolean> = this.store$.pipe(select(isAtPastEvents));
    isCreated$: Observable<boolean> = this.store$.pipe(select(isAtCreatedEvents));
    isCreating$: Observable<boolean> = this.store$.pipe(select(isCreatingEvent));
    isEvent$: Observable<boolean> = this.store$.pipe(select(isAtEvent));

    selectedIndex$: Observable<number> = combineLatest([this.isUpcoming$, this.isPast$, this.isCreated$]).pipe(
        map(([upcoming, past, created]) => {
            if (upcoming) return 0;
            if (past) return 1;
            if (created) return 2;
            return 0;
        })
    );

    onTabChange(index: number) {
        const routes = ['/events/upcoming', '/events/past', '/events/created'];
        this.router.navigateByUrl(routes[index]);
    }

    openEventsCalendar() {
        this.dialogService.open(EventsCalendarComponent);
    }
}
