import { inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { selectUserSettingByKey } from '../../store/settings/settings.selectors';
import { updateSetting } from '../../store/settings/settings.actions';

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

    async toggleTheme(mode: ColorMode) {
        this.colorMode.set(mode);
        const setting = await firstValueFrom(this.store$.select(selectUserSettingByKey('color_mode')));
        if (setting) {
            this.store$.dispatch(updateSetting({ changes: { ...setting, value: mode === 'dark' } }));
        }
        this.applyTheme();
    }

    async applyTheme() {
        const mode = this.colorMode() === 'auto' ? this.getPrefers() : this.colorMode();
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(mode);
    }
}
