import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { uploadFile } from '../../../../store/files/files.actions';
import { AppFile } from '../../../../store/files/files.model';
import { DeviceService } from '../../../../shared/services/device.service';

@Component({
    selector: 'app-drop-zone',
    templateUrl: './drop-zone.component.html',
    standalone: true,
    imports: [MatIcon, NgClass, MatButton],
    styleUrls: ['./drop-zone.component.scss']
})
export class DropZoneComponent {
    store$ = inject(Store);
    isHovering = false;
    deviceService = inject(DeviceService);
    eventId = input<string>();

    onDragOver(event: DragEvent) {
        event.preventDefault();
        this.isHovering = true;
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        this.isHovering = false;
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        this.isHovering = false;
        if (event.dataTransfer?.files) {
            this.handleFiles(event.dataTransfer.files);
        }
    }

    onFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.handleFiles(input.files);
        }
    }

    handleFiles(files: FileList) {
        Array.from(files).forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                const fileBlob = new Blob([reader.result as ArrayBuffer], { type: file.type });

                const appFile: AppFile = {
                    name: file.name,
                    blob: fileBlob
                } as AppFile;

                if (this.eventId()) {
                    appFile.eventId = this.eventId() as string;
                }

                console.log('File:', appFile.name, file.size, file.type, appFile.blob);
                this.store$.dispatch(uploadFile({ payload: appFile }));
            };

            reader.readAsArrayBuffer(file);
        });
    }
}
