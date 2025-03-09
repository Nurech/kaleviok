import { Component, inject, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { EventStatus, IEvent } from '../../../../store/events/events.model';
@Component({
    selector: 'app-event-mini',
    imports: [MatCard, DatePipe, MatIcon, MatIconButton],
    templateUrl: './event-mini.component.html',
    standalone: true,
    styleUrl: './event-mini.component.scss'
})
export class EventMiniComponent {
    @Input() event!: IEvent;
    router = inject(Router);

    viewEvent() {
        this.router.navigate(['/events', this.event.id]);
    }

    protected readonly EventStatus = EventStatus;
}
