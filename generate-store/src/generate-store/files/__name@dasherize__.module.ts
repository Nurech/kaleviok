import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { settingsFeature } from './<%= dasherize(name) %>.reducer';
import { <%= classify(name) %>Effects } from './<%= dasherize(name) %>.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(settingsFeature),
    EffectsModule.forFeature([<%= classify(name) %>Effects]),
  ],
})
export class <%= classify(name) %>StoreModule {}
