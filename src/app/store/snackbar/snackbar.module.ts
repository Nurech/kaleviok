import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { snackbarFeature } from './snackbar.reducer';
import { SnackbarEffects } from './snackbar.effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(snackbarFeature), EffectsModule.forFeature([SnackbarEffects])],
})
export class SnackbarStoreModule {}
