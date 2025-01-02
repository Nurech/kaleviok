import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { IconResolver, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LayoutComponent } from './core/layout/layout.component';
import { DialogService } from './shared/services/dialog.service';
import { PwaUpdateDialogComponent } from './core/components/pwa-update-dialog/pwa-update-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, MatCardModule, MatButtonModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);
  private dialogService = inject(DialogService);

  ngOnInit(): void {
    this.initializeIconRegistry();
    // this.sheetService.open(LoginComponent);
    // this.dialogService.open(PwaUpdateDialogComponent);

    this.dialogService.open(PwaUpdateDialogComponent, {
      data: {
        currentVersion: '0.0.65',
        newVersion: '0.0.66',
      },
    });
  }

  initializeIconRegistry() {
    const resolver: IconResolver = (name) => this.sanitizer.bypassSecurityTrustResourceUrl(`/img/${name}.svg`);
    this.iconRegistry.addSvgIconResolver(resolver);
  }
}
