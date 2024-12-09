import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {inject, Injectable} from '@angular/core';
import {map, Observable, shareReplay} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DeviceService {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
