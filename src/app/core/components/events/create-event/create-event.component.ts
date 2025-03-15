import { Component, inject, Signal, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgClass, NgIf } from '@angular/common';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { Store, select } from '@ngrx/store';
import { MatIcon } from '@angular/material/icon';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { toSignal } from '@angular/core/rxjs-interop';
import { deleteEvent, saveEvent } from '../../../../store/events/events.actions';
import { DialogService } from '../../../../shared/services/dialog.service';
import { navigateBack } from '../../../../store/router/router.actions';
import { selectCurrentEvent } from '../../../../store/events/events.selectors';
import { DropZoneComponent } from '../../files/drop-zone/drop-zone.component';
import { selectAllEventFiles } from '../../../../store/files/files.selectors';
import { FilesListComponent } from '../../files/files-list/files-list.component';
import { downloadFilesByEventId } from '../../../../store/files/files.actions';
import { AppFile } from '../../../../store/files/files.model';
import { ValidatorsCustom } from '../../../../shared/validators/validators-custom';
import { selectMaxFilesAllowedWhenCreateEvent } from '../../../../store/app-settings/app-settings.selectors';
import { EventStatus, IEvent } from '../../../../store/events/events.model';

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
        MatIcon,
        DropZoneComponent,
        FilesListComponent,
        NgClass
    ]
})
export class CreateEventComponent {
    private fb = inject(FormBuilder);
    private store$ = inject(Store);
    private dialogService = inject(DialogService);
    maxFilesAllowed$: Signal<number> = toSignal(this.store$.select(selectMaxFilesAllowedWhenCreateEvent), { initialValue: 10 });
    event$: Signal<IEvent> = toSignal(this.store$.pipe(select(selectCurrentEvent)), { initialValue: {} as IEvent });
    eventFiles$: Signal<AppFile[]> = toSignal(this.store$.pipe(select(selectAllEventFiles)), { initialValue: [] });

    eventForm: FormGroup = this.fb.group({
        id: '',
        status: null,
        title: ['', Validators.required],
        startDate: ['', Validators.required],
        startTime: ['', Validators.required],
        endDate: ['', Validators.required],
        endTime: ['', Validators.required],
        description: ['', [Validators.required, Validators.minLength(10)]],
        location: ['', Validators.required]
    });

    filesForm: FormGroup = this.fb.group({
        files: this.fb.array([], [ValidatorsCustom.validateFilesAllUploaded, ValidatorsCustom.maxItems(this.maxFilesAllowed$())])
    });

    constructor() {
        effect(() => {
            const maxFiles = this.maxFilesAllowed$(); // Reactive update
            this.filesForm.setControl('files', this.fb.array([], [ValidatorsCustom.validateFilesAllUploaded, ValidatorsCustom.maxItems(maxFiles)]));
        });

        effect(() => {
            const event = this.event$();
            if (event) {
                this.eventForm.patchValue(event, { emitEvent: false });
                this.store$.dispatch(downloadFilesByEventId({ eventId: event.id }));
            }
        });

        effect(() => {
            this.syncFilesWithForm();
            this.eventForm.updateValueAndValidity();
        });
    }

    private syncFilesWithForm(): void {
        const fileArray = this.filesForm.get('files') as FormArray;
        fileArray.clear();

        const files = this.eventFiles$();
        files.forEach((file) => {
            fileArray.push(this.fb.control(file));
        });

        this.filesForm.updateValueAndValidity();
    }

    delete(): void {
        this.dialogService.openGenericDialog('Delete Event', 'Are you sure you want to delete this event?', (confirm) => {
            if (confirm) {
                this.store$.dispatch(deleteEvent({ payload: this.eventForm.value.id }));
                this.store$.dispatch(navigateBack());
            }
        });
    }

    save(isClose?: boolean): void {
        const eventStatus = this.eventForm.value.status;
        console.warn('eventStatus', eventStatus);
        if (isClose) {
            if (eventStatus === EventStatus.DRAFT) {
                this.dialogService.openGenericDialog('Update event', 'Do you wish to update draft?', (confirmed) => {
                    if (confirmed) {
                        this.store$.dispatch(saveEvent({ payload: this.eventForm.value }));
                    }
                    this.store$.dispatch(navigateBack());
                });
            } else if (eventStatus === EventStatus.REVIEW) {
                this.dialogService.openGenericDialog('Update event', 'Do you wish to update?', (confirmed) => {
                    if (confirmed) {
                        this.store$.dispatch(saveEvent({ payload: this.eventForm.value }));
                    }
                    this.store$.dispatch(navigateBack());
                });
            } else {
                this.dialogService.openGenericDialog('Save event', 'Do you want to save this event as a draft?', (confirmed) => {
                    if (confirmed) {
                        this.eventForm.value.status = EventStatus.DRAFT;
                        this.store$.dispatch(saveEvent({ payload: this.eventForm.value }));
                    }
                    this.store$.dispatch(navigateBack());
                });
            }
        } else {
            if (this.eventForm.invalid || this.filesForm.invalid) {
                this.dialogService.openGenericDialog('Invalid Form', 'Please fill in all required fields.', () => {
                    return;
                });
            }

            if (eventStatus === EventStatus.REVIEW_OK) {
                this.dialogService.openGenericDialog(
                    'Publish Event',
                    'Are you sure you want to publish this event? This will send notification to all members',
                    () => {
                        this.eventForm.value.status = EventStatus.PUBLISHED;
                        console.log('Publish event:', this.eventForm.value);
                        this.store$.dispatch(saveEvent({ payload: this.eventForm.value }));
                        this.store$.dispatch(navigateBack());
                    }
                );
            } else if (eventStatus === EventStatus.DRAFT) {
                this.dialogService.openGenericDialog(
                    'Publish Event',
                    'Saada üritus ülevaatusele? See saadab ürituse juhatuse liikmetele kooskõlastusringile. Peale kooskõlastust saad tavituse ja saad ürituse edasi saata kõigile.',
                    () => {
                        this.eventForm.value.status = EventStatus.REVIEW;
                        console.log('Publish event:', this.eventForm.value);
                        this.store$.dispatch(saveEvent({ payload: this.eventForm.value }));
                        this.store$.dispatch(navigateBack());
                    }
                );
            }
        }
    }

    protected readonly EventStatus = EventStatus;
}
