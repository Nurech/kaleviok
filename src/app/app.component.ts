import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { IconResolver, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LayoutComponent } from './core/layout/layout.component';
import { SheetService } from './shared/services/sheet.service';
import { SnackbarService } from './shared/services/snackbar.service';
import { Snackbar, SnackbarActions, SnackbarType } from './shared/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, MatCardModule, MatButtonModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private sheetService = inject(SheetService);
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);
  private snackbarService = inject(SnackbarService);

  ngOnInit(): void {
    this.initializeIconRegistry();
    const snack = new Snackbar(SnackbarType.INFO, 'you_have_been_logged_out', 300000, undefined, SnackbarActions.CLOSE);
    this.snackbarService.open(snack);
    // this.sheetService.open(LoginComponent);
  }

  initializeIconRegistry() {
    const resolver: IconResolver = (name) => this.sanitizer.bypassSecurityTrustResourceUrl(`/img/${name}.svg`);
    this.iconRegistry.addSvgIconResolver(resolver);
  }
}
