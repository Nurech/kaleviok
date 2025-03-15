import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppSettingsService } from './app-settings.service';

@Injectable()
export class AppSettingsEffects {
    constructor(private actions$: Actions, private service: AppSettingsService) {}

}
