import { Injectable, inject } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { CoreService } from './core.service';

@Injectable()
export class CoreEffects {
  private actions$ = inject(Actions);
  private coreService = inject(CoreService);
}
