import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { selectCurrentEventVM } from '../../../../store/events/events.selectors';
import { DialogService } from '../../../../shared/services/dialog.service';
import { deleteEvent, editEvent } from '../../../../store/events/events.actions';

@Component({
    selector: 'app-event',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatChipsModule, MatButtonModule, MatIcon],
    templateUrl: './event.component.html',
    styleUrl: './event.component.scss'
})
export class EventComponent {
    private store$ = inject(Store);
    event$ = this.store$.select(selectCurrentEventVM);
    dialogService = inject(DialogService);

    onDelete(id: string) {
        this.dialogService.openGenericDialog('Delete event', 'Are you sure you want to delete this event?', () => {
            this.store$.dispatch(deleteEvent({ payload: id }));
        });
    }

    onEdit(id: string) {
        this.store$.dispatch(editEvent({ payload: id }));
    }
}
