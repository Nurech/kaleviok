import { AfterViewInit, Component, Input, signal, ViewChild, ElementRef } from '@angular/core';
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
export class InfoComponent implements AfterViewInit {
  @ViewChild(MatTooltip, { static: true }) tooltip!: MatTooltip;
  @ViewChild('infoContainer', { static: true }) infoContainer!: ElementRef;
  @Input() text = '[MISSING]';
  show = signal(false);

  ngAfterViewInit() {
    this.infoContainer.nativeElement.addEventListener('click', () => {
      this.show.set(!this.show());
      if (this.show()) {
        this.tooltip.show();
      } else {
        this.tooltip.hide();
      }
    });
  }
}
