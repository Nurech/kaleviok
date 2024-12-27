import { Component, inject } from '@angular/core';
import { MatCardActions, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { InfoComponent } from '../../../shared/components/info/info.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PwaService } from '../../../shared/services/pwa.service';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-install-pwa',
  standalone: true,
  imports: [
    MatCardModule,
    MatCheckbox,
    FormsModule,
    MatSlideToggle,
    InfoComponent,
    MatCardHeader,
    MatCardActions,
    MatButton,
    MatIcon,
  ],
  templateUrl: './install-pwa.component.html',
  styles: ``,
})
export class InstallPwaComponent {
  pwaService = inject(PwaService);
  storage = inject(StorageService);

  dontShowAgain(checked: boolean) {
    this.storage.set(this.pwaService.DONT_SHOW_PWA_PROMOTION, checked.toString());
  }
}
