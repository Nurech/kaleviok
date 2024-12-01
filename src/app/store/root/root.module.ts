import { NgModule } from '@angular/core';
import {MetaReducer, StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AccountsStoreModule} from '../account/account.module';
import {CoreStoreModule} from '../core/core.module';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    AccountsStoreModule,
    CoreStoreModule,
  ],
})
export class RootStoreModule {}
