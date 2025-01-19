import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { coreFeature } from './core.reducer';
import { CoreEffects } from './core.effects';

@NgModule({
    imports: [CommonModule, StoreModule.forFeature(coreFeature), EffectsModule.forFeature([CoreEffects])]
})
export class CoreStoreModule {}
