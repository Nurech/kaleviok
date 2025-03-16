import { Component, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { selectEvents } from '../../../../store/events/events.selectors';
import { EventMiniComponent } from '../event-mini/event-mini.component';
import { Event } from '../../../../store/events/events.model';

@Component({
    selector: 'app-events-list',
    imports: [AsyncPipe, EventMiniComponent],
    templateUrl: './events-list.component.html',
    standalone: true,
    styleUrl: './events-list.component.scss'
})
export class EventsListComponent {
    store$ = inject(Store);
    events$: Observable<Event[] | any[]> = this.store$.pipe(select(selectEvents));
}
