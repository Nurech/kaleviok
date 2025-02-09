import { inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserSettingByKey } from '../../store/settings/settings.selectors';

export type ColorMode = 'light' | 'dark' | 'auto';

@Injectable({ providedIn: 'root' })
export class ThemeChangerService {
    private store$ = inject(Store);
    colorMode = signal<ColorMode>('auto');

    constructor() {
        this.init();
    }

    private init() {
        this.store$.select(selectUserSettingByKey('color_mode')).subscribe((setting) => {
            console.warn('setting', setting);
            if (setting) {
                this.colorMode.set(setting.value ? 'dark' : 'light');
                this.applyTheme();
            }
        });

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => this.applyTheme());
    }

    private getPrefers() {
        return this.colorMode() === 'auto'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
            : this.colorMode();
    }

    async applyTheme() {
        const mode = this.colorMode() === 'auto' ? this.getPrefers() : this.colorMode();
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(mode);
    }
}
