import { Component, input } from '@angular/core';
import { FileComponent } from '../file/file.component';

@Component({
    selector: 'app-files-list',
    imports: [FileComponent],
    templateUrl: './files-list.component.html',
    standalone: true,
    styleUrl: './files-list.component.scss'
})
export class FilesListComponent {
    files = input([]);
}
