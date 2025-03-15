import { Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatIconButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { DecimalPipe, JsonPipe } from '@angular/common';
import { AppFile } from '../../../../store/files/files.model';
import { deleteFile } from '../../../../store/files/files.actions';

@Component({
    selector: 'app-list-file',
    imports: [MatIcon, MatCard, MatCardContent, MatProgressBar, MatIconButton, DecimalPipe, JsonPipe],
    templateUrl: './list-file.component.html',
    standalone: true,
    styleUrl: './list-file.component.scss'
})
export class ListFileComponent {
    file = input.required<AppFile>();
    store$ = inject(Store);

    deleteFile() {
        this.store$.dispatch(deleteFile({ payload: this.file() }));
    }
}
