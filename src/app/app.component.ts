import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { IconResolver, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LayoutComponent } from './core/layout/layout.component';
import { SheetService } from './shared/services/sheet.service';

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

  ngOnInit(): void {
    this.initializeIconRegistry();

    // this.sheetService.open(LoginComponent);
  }

  initializeIconRegistry() {
    const resolver: IconResolver = (name) => this.sanitizer.bypassSecurityTrustResourceUrl(`/img/${name}.svg`);
    this.iconRegistry.addSvgIconResolver(resolver);
  }
}
