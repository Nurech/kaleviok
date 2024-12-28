import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './<%= dasherize(name) %>.reducer';
import { <%= classify(name) %>Effects } from './<%= dasherize(name) %>.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('<%= camelize(name) %>', reducer),
    EffectsModule.forFeature([<%= classify(name) %>Effects]),
  ],
})
export class <%= classify(name) %>Module {}
