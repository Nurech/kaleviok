import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appSettingsFeature } from './app-settings.reducer';
import { AppSettingsEffects } from './app-settings.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(appSettingsFeature),
    EffectsModule.forFeature([AppSettingsEffects]),
  ],
})
export class AppSettingsStoreModule {}
