import { Component, effect, inject, Signal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectAccountId, selectEditMode, selectFragment } from '../../../../store/router/router.selectors';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { selectAuthenticatedAccount } from '../../../../store/auth/auth.selectors';
import { ClipboardComponent } from '../../../../shared/components/clipboard/clipboard.component';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [AvatarComponent, AsyncPipe, ClipboardComponent, FormsModule],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss'
})
export class AccountComponent {
    private store$ = inject(Store);
    account$ = this.store$.select(selectAuthenticatedAccount);

    editMode: Signal<boolean>;
    accountId: Signal<string | null>;
    section: Signal<string | null | undefined>;

    constructor() {
        // Convert NgRx selectors to Signals
        this.editMode = toSignal(this.store$.pipe(select(selectEditMode)), { initialValue: false });
        this.accountId = toSignal(this.store$.pipe(select(selectAccountId)), { initialValue: null });
        this.section = toSignal(this.store$.pipe(select(selectFragment)), { initialValue: null });

        effect(() => {
            const sectionId = this.section();
            if (sectionId) {
                console.log('Scrolling to section', sectionId);
                this.scrollToSection(sectionId);
            }
        });
    }

    private scrollToSection(sectionId: string): void {
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
}
