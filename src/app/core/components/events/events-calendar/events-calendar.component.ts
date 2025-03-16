import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-events-calendar',
    imports: [MatCardModule, MatDatepickerModule],
    templateUrl: './events-calendar.component.html',
    standalone: true,
    styleUrl: './events-calendar.component.scss'
})
export class EventsCalendarComponent {}
