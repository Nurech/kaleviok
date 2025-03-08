import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { Store, select } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { selectTempEvent } from '../../../../store/events/events.selectors';
import { clearTempEvent, publishEvent, saveTempEvent } from '../../../../store/events/events.actions';
import { DialogService } from '../../../../shared/services/dialog.service';
import { navigateBack } from '../../../../store/router/router.actions';

@Component({
    selector: 'app-create-event',
    standalone: true,
    templateUrl: './create-event.component.html',
    styleUrl: './create-event.component.scss',
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTimepickerModule,
        NgIf,
        MatDatepicker,
        MatDatepickerToggle,
        MatDatepickerInput,
        MatIcon
    ]
})
export class CreateEventComponent implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    private store$ = inject(Store);
    private dialogService = inject(DialogService);
    private formSubscription?: Subscription;

    eventForm: FormGroup;

    constructor() {
        this.eventForm = this.fb.group({
            title: ['', Validators.required],
            startDate: [new Date(), Validators.required],
            startTime: ['', Validators.required],
            endDate: ['', Validators.required],
            endTime: ['', Validators.required],
            description: ['', [Validators.required, Validators.minLength(10)]],
            location: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.store$.pipe(select(selectTempEvent)).subscribe((tempEvent) => {
            if (tempEvent) {
                this.eventForm.patchValue(tempEvent, { emitEvent: false });
            }
        });

        this.formSubscription = this.eventForm.valueChanges
            .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
            .subscribe((value) => {
                this.store$.dispatch(saveTempEvent({ payload: value }));
            });
    }

    ngOnDestroy(): void {
        if (this.formSubscription) {
            this.formSubscription.unsubscribe();
        }
    }

    clear(): void {
        this.dialogService.openGenericDialog('Clear Form', 'Are you sure you want to clear the form?', () => {
            this.store$.dispatch(clearTempEvent());
            this.eventForm.reset();
        });
    }

    delete(): void {
        this.dialogService.openGenericDialog('Delete Event', 'Are you sure you want to delete this event?', () => {
            console.log('Delete event:', this.eventForm.value);
        });
    }

    save(): void {
        if (this.eventForm.valid) {
            this.dialogService.openGenericDialog('Save Event', 'Do you want to save this event as a draft?', () => {
                console.log('Event saved as draft:', this.eventForm.value);
                this.store$.dispatch(saveTempEvent({ payload: this.eventForm.value }));
                this.store$.dispatch(navigateBack());
            });
        } else {
            console.log('Form is invalid');
        }
    }

    publish(): void {
        this.dialogService.openGenericDialog('Publish Event', 'Are you sure you want to publish this event?', () => {
            console.log('Publish event:', this.eventForm.value);
            this.store$.dispatch(publishEvent({ payload: this.eventForm.value }));
            this.store$.dispatch(navigateBack());
        });
    }

    onCloseCreateForm() {
        this.dialogService.openGenericDialog('Publish Event', 'Close and save event?', () => {
            this.store$.dispatch(publishEvent({ payload: this.eventForm.value }));
            this.store$.dispatch(navigateBack());
        });
    }
}
