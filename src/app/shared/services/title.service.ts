import { Injectable } from '@angular/core';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TitleService extends TitleStrategy {
    constructor(
        private title: Title,
        private translate: TranslateService
    ) {
        super();
    }
    updateTitle(snapshot: RouterStateSnapshot): void {
        const title = this.buildTitle(snapshot);
        if (title !== undefined) {
            this.translate.get(title).subscribe((translated) => {
                this.title.setTitle(translated);
            });
        }
    }
}
