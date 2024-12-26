import { AfterViewInit, Component, Input, signal, ViewChild, ElementRef, HostListener } from '@angular/core';
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
    this.infoContainer.nativeElement.addEventListener('click', (event: Event) => {
      event.stopPropagation(); // Prevent closing when clicking inside the component
      this.show.set(!this.show());
      if (this.show()) {
        this.tooltip.show();
      } else {
        this.tooltip.hide();
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.show() && !this.infoContainer.nativeElement.contains(event.target)) {
      this.show.set(false);
      this.tooltip.hide();
    }
  }
}
