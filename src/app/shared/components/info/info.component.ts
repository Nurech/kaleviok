import {
  Component,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatRipple } from '@angular/material/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [MatIconButton, MatIcon, MatTooltip, MatRipple, TranslatePipe],
  templateUrl: './info.component.html',
  styles: [],
})
export class InfoComponent {
  @ViewChild(MatTooltip, { static: true }) tooltip!: MatTooltip;
  @Input() text = '[MISSING]';
  show = signal(false);

  toggle() {
    this.show.set(!this.show());
    if (this.show()) {
      this.tooltip.show();
    } else {
      this.tooltip.hide();
    }
  }
}
