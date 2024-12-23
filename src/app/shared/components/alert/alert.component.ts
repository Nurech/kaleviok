import { booleanAttribute, Component, ContentChild, Directive, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export type AlertType = 'info';

const ICON_MAP: Record<AlertType, string> = {
  info: 'info',
};

@Directive({ selector: '[appAlertHeading]', standalone: true })
export class AlertHeadingDirective {}

@Directive({ selector: '[appAlertFooter]', standalone: true })
export class AlertFooterDirective {}

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() type: AlertType = 'info';
  @Input({ transform: booleanAttribute }) closeable = false;
  @Input() message = '';
  @Input() heading = '';
  @Input() footer = '';
  @ContentChild(AlertHeadingDirective) headingDir!: AlertHeadingDirective;
  @ContentChild(AlertFooterDirective) footerDir!: AlertFooterDirective;

  icon = ICON_MAP[this.type];
}
