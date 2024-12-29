import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { settingsFeature } from './settings.reducer';
import { SettingsEffects } from './settings.effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(settingsFeature), EffectsModule.forFeature([SettingsEffects])],
})
export class SettingsStoreModule {}
