import { NgModule } from '@angular/core';
import { StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import {AccountsStoreModule} from '../account/account.module';
import {CoreStoreModule} from '../core/core.module';
import {UsersStoreModule} from '../user/user.module';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    AccountsStoreModule,
    CoreStoreModule,
    UsersStoreModule,
  ],
})
export class RootStoreModule {}
