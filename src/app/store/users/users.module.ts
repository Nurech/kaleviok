import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { featureKey, reducer } from './users.reducer';
import { UsersEffects } from './users.effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(featureKey, reducer), EffectsModule.forFeature([UsersEffects])],
  declarations: [],
})
export class UsersStoreModule {}
