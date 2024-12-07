import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {featureKey, reducer} from './user.reducer';
import {UserEffects} from './user.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      featureKey,
      reducer
    ),
    EffectsModule.forFeature([UserEffects]),
  ],
  declarations: [],
})
export class UsersStoreModule {}
