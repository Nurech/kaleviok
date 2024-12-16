import {AfterViewInit, Component, inject, OnDestroy, OnInit} from '@angular/core';

import {LayoutComponent} from './core/layout/layout.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {AsyncPipe} from '@angular/common';
import {IconResolver, MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Store} from '@ngrx/store';
import {autoLogin} from './store/core/core.actions';
import {StorageService} from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LayoutComponent,
    MatCardModule,
    MatButtonModule,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private store$ = inject(Store);
  private storage = inject(StorageService);
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.initializeIconRegistry();
    if (this.storage.get('autoLogin')) {
      this.store$.dispatch(autoLogin());
    }
  }

  initializeIconRegistry() {
    const resolver: IconResolver = (name) => this.sanitizer.bypassSecurityTrustResourceUrl(`/img/${name}.svg`);
    this.iconRegistry.addSvgIconResolver(resolver);
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy() {
  }
}
