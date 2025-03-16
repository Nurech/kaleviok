import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { eventsFeature } from './events.reducer';
import { EventsEffects } from './events.effects';

@NgModule({
    imports: [CommonModule, StoreModule.forFeature(eventsFeature), EffectsModule.forFeature([EventsEffects])]
})
export class EventsStoreModule {}
