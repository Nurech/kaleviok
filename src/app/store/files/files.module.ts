import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { filesFeature } from './files.reducer';
import { FilesEffects } from './files.effects';

@NgModule({
    imports: [CommonModule, StoreModule.forFeature(filesFeature), EffectsModule.forFeature([FilesEffects])]
})
export class FilesStoreModule {}
