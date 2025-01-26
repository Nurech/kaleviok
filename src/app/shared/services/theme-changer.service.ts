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

    private async init() {
        const setting = await firstValueFrom(this.store$.select(selectUserSettingByKey('color_mode')));
        this.colorMode.set((setting?.value as ColorMode) || 'auto');
        this.applyTheme();
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => this.applyTheme());
    }

    private getPrefers() {
        return this.colorMode() === 'auto'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
            : this.colorMode();
    }

    async applyTheme(change?: string) {
        const mode = change || this.getPrefers();
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(mode);

        const setting = await firstValueFrom(this.store$.select(selectUserSettingByKey('color_mode')));
        if (setting) {
            this.store$.dispatch(updateSetting({ changes: { ...setting, value: mode } }));
        }
    }
}
