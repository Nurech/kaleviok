import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { selectCurrentEventVM } from '../../../../store/events/events.selectors';
import { EventVM } from '../../../../store/events/events.model';

@Component({
    selector: 'app-event',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatChipsModule],
    templateUrl: './event.component.html',
    styleUrl: './event.component.scss'
})
export class EventComponent {
    private store$ = inject(Store);
    event$: Observable<EventVM | null> = this.store$.select(selectCurrentEventVM);
}
