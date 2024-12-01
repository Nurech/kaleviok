import {NgModule} from "@angular/core";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {featureKey, reducer} from './core.reducer';
import {CoreEffects} from './core.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(
      featureKey,
      reducer
    ),
    EffectsModule.forFeature([CoreEffects]),
  ],
  declarations: [],
})
export class CoreStoreModule {
}
