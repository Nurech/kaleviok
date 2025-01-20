import { Component, Input, ViewChild } from '@angular/core';
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
    @ViewChild(MatTooltip, { static: true }) tooltip!: MatTooltip;
    @Input() text = '[MISSING]';

    toggle() {
        this.tooltip.show();
    }
}
