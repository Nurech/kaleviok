import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {featureKey, reducer} from './snackbar.reducer';
import {SnackbarEffects} from './snackbar.effects';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    StoreModule.forFeature(
      featureKey,
      reducer
    ),
    EffectsModule.forFeature([SnackbarEffects]),
  ],
  declarations: [],
})
export class SnackbarStoreModule {
}
