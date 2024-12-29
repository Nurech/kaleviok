import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { featureKey, reducer } from './<%= dasherize(name) %>.reducer';
import { <%= classify(name) %>Effects } from './<%= dasherize(name) %>.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([<%= classify(name) %>Effects]),
  ],
})
export class <%= classify(name) %>StoreModule {}
