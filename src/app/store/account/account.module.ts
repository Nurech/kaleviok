import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {featureKey, reducer} from './account.reducer';
import {AccountEffects} from './account.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      featureKey,
      reducer
    ),
    EffectsModule.forFeature([AccountEffects]),
  ],
  declarations: [],
})
export class AccountsStoreModule {
}
