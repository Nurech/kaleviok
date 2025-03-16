import { Component, input } from '@angular/core';
import { ListFileComponent } from '../list-file/list-file.component';
import { AppFile } from '../../../../store/files/files.model';

@Component({
    selector: 'app-files-list',
    imports: [ListFileComponent],
    templateUrl: './files-list.component.html',
    standalone: true,
    styleUrl: './files-list.component.scss'
})
export class FilesListComponent {
    files = input.required<AppFile[]>();
}
