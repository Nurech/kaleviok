import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';

@Component({
    selector: 'app-clipboard',
    imports: [MatIcon, MatIconButton, CdkCopyToClipboard],
    templateUrl: './clipboard.component.html',
    standalone: true,
    styleUrl: './clipboard.component.scss'
})
export class ClipboardComponent {
    value = input<string | null | undefined>('');
}
