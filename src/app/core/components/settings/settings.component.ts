import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { updateSetting } from '../../../store/settings/settings.actions';
import { selectUserSettings } from '../../../store/settings/settings.selectors';
import { Setting } from '../../../store/settings/settings.model';

@Component({
    selector: 'app-settings',
    imports: [AsyncPipe, MatIcon, MatSlideToggle, NgForOf, TranslatePipe, FormsModule],
    templateUrl: './settings.component.html',
    standalone: true,
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {
    private store$ = inject(Store);
    settings$: Observable<Setting[]> = this.store$.select(selectUserSettings).pipe(map((settings) => settings.map((setting) => ({ ...setting }))));

    onChangeSetting(setting: Setting): void {
        this.store$.dispatch(updateSetting({ changes: setting }));
    }
}
