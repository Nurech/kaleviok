import { Component, input, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatRipple } from '@angular/material/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-info',
    standalone: true,
    imports: [MatTooltip, MatRipple, TranslatePipe, MatIcon],
    templateUrl: './info.component.html'
})
export class InfoComponent {
    readonly tooltip = viewChild.required(MatTooltip);
    readonly text = input('[MISSING]');

    toggle() {
        this.tooltip().show();
    }
}
