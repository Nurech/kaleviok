import {afterNextRender, Component, inject, Injector,} from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {ThemeChangerService} from '../../colors/theme-changer.service';

@Component({
  selector: 'lib-image-input',
  templateUrl: 'image-input.component.html',
  styleUrl: 'image-input.component.scss',
  standalone: true,
  imports: [MatIconModule, MatRippleModule],
})
export class ImageInputComponent {
  imgSrc = '';
  private themeChanger = inject(ThemeChangerService);
  private injector = inject(Injector);

  fileChange(ev: Event, image: HTMLImageElement) {
    const files = (ev.target as HTMLInputElement).files;

    if (files) {
      for (const file of Array.from(files)) {
        if (validFileType(file)) {
          this.imgSrc = URL.createObjectURL(file);

          this._executeOnStable(() => {
            this.themeChanger.changeSeedFromImage(image);
          });
        }
      }
    }
  }

  private _executeOnStable(fn: () => any): void {
    afterNextRender(fn, { injector: this.injector });
  }
}

const fileTypes = ['image/jpeg', 'image/pjpeg', 'image/png'];

function validFileType(file: File) {
  return fileTypes.includes(file.type);
}
