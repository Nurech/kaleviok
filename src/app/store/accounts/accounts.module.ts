import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { featureKey, reducer } from './accounts.reducer';
import { AccountsEffects } from './accounts.effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(featureKey, reducer), EffectsModule.forFeature([AccountsEffects])],
  declarations: [],
})
export class UsersStoreModule {}
