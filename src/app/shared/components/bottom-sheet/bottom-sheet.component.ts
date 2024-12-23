import { Component, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { LoginComponent } from '../../../core/components/login/login.component';

@Component({
  selector: 'app-bottom-sheet',
  template: `
    @if (data.component === 'LoginComponent') {
      <app-login></app-login>
    }
  `,
  imports: [LoginComponent],
  standalone: true,
})
export class BottomSheetComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { component: string }) {}
}
