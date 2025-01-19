import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { RouterEffects } from './router.effects';

@NgModule({
    imports: [StoreModule.forFeature('router', routerReducer), EffectsModule.forFeature([RouterEffects])]
})
export class RouterStoreModule {}
