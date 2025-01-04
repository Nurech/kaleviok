import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { errorFeature } from './error.reducer';
import { ErrorEffects } from './error.effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(errorFeature), EffectsModule.forFeature([ErrorEffects])],
})
export class ErrorStoreModule {}
