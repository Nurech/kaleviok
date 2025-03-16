import { Component, inject, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EventStatus, Event } from '../../../../store/events/events.model';
import { InfoComponent } from '../../../../shared/components/info/info.component';
import { editEvent } from '../../../../store/events/events.actions';
@Component({
    selector: 'app-event-mini',
    imports: [MatCard, DatePipe, MatIcon, MatIconButton, InfoComponent],
    templateUrl: './event-mini.component.html',
    standalone: true,
    styleUrl: './event-mini.component.scss'
})
export class EventMiniComponent {
    @Input() event!: Event;
    router = inject(Router);
    store$ = inject(Store);

    viewEvent() {
        this.router.navigate(['/events', this.event.id]);
    }

    protected readonly EventStatus = EventStatus;

    onEditEvent() {
        this.store$.dispatch(editEvent({ payload: this.event.id }));
    }
}
