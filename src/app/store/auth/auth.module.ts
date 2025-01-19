import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { featureKey, reducer } from './auth.reducer';
import { AuthEffects } from './auth.effects';

@NgModule({
    imports: [CommonModule, StoreModule.forFeature(featureKey, reducer), EffectsModule.forFeature([AuthEffects])],
    declarations: []
})
export class AuthStoreModule {}
