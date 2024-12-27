import { inject, Injectable, signal } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../components/bottom-sheet/bottom-sheet.component';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  private bottomSheet = inject(MatBottomSheet);

  isOpen = signal(false);

  open(component: string) {
    this.isOpen.set(true);

    const sheetRef = this.bottomSheet.open(BottomSheetComponent, { data: { component } });

    sheetRef.afterDismissed().subscribe(() => {
      this.isOpen.set(false);
    });
  }
}
