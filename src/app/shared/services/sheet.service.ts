import { inject, Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../components/bottom-sheet/bottom-sheet.component';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  private bottomSheet = inject(MatBottomSheet);

  open(component: string) {
    this.bottomSheet.open(BottomSheetComponent, { data: { component } });
  }
}
