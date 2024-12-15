import {AfterViewInit, Component, inject, OnDestroy, OnInit} from '@angular/core';

import {LayoutComponent} from './core/layout/layout.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {AsyncPipe} from '@angular/common';
import {IconResolver, MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Store} from '@ngrx/store';
import {autoLogin} from './store/core/core.actions';

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


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const resolver: IconResolver = (name) => sanitizer.bypassSecurityTrustResourceUrl(`/img/${name}.svg`);
    iconRegistry.addSvgIconResolver(resolver);
  }

  ngOnInit(): void {
    this.store$.dispatch(autoLogin());
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy() {
  }
}
