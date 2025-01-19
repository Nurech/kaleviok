import { inject, Injectable, signal } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({
    providedIn: 'root'
})
export class SheetService {
    private bottomSheet = inject(MatBottomSheet);
    private sheetRefs = new Map<string, MatBottomSheetRef<any>>();

    isOpen = signal(false);
    openSheet = signal<string | null>(null);

    open<T, D = any>(component: ComponentType<T>, data?: D): MatBottomSheetRef<T> | undefined {
        const key = component.name;

        if (this.sheetRefs.has(key)) {
            console.warn(`Bottom sheet with key "${key}" is already open.`);
            return;
        }

        const sheetRef = this.bottomSheet.open<T, D>(component, { data });
        this.sheetRefs.set(key, sheetRef);

        this.isOpen.set(true);
        this.openSheet.set(key);

        sheetRef.afterDismissed().subscribe(() => {
            this.isOpen.set(false);
            this.openSheet.set(null);
            this.sheetRefs.delete(key);
        });

        return sheetRef;
    }

    close<T>(component: ComponentType<T>): void {
        const key = component.name;
        const sheetRef = this.sheetRefs.get(key);

        if (sheetRef) {
            sheetRef.dismiss();
            this.sheetRefs.delete(key);
        }
    }

    closeAll(): void {
        this.sheetRefs.forEach((sheetRef) => sheetRef.dismiss());
        this.sheetRefs.clear();
        this.isOpen.set(false);
        this.openSheet.set(null);
    }
}
