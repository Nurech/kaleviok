import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, map, catchError, take } from 'rxjs';
import { EventsService } from '../../store/events/events.service';
import { selectEventById } from '../../store/events/events.selectors';
import { getEventSuccess } from '../../store/events/events.actions';

@Injectable({
    providedIn: 'root'
})
export class EventExistsGuard implements CanActivate {
    private store = inject(Store);
    private router = inject(Router);
    private eventsService = inject(EventsService);

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
        const eventId = route.paramMap.get('id') ?? '';

        console.log(`[EventExistsGuard] Checking event ID: ${eventId}`);

        return this.store.select(selectEventById(eventId)).pipe(
            take(1),
            switchMap((event) => {
                if (event) {
                    console.log(`[EventExistsGuard] Event found in store.`);
                    return of(true);
                }

                console.log(`[EventExistsGuard] Event not in store. Fetching from service...`);

                return this.eventsService.getEventById(eventId).pipe(
                    map((fetchedEvent) => {
                        if (fetchedEvent) {
                            console.log(`[EventExistsGuard] Event found in Firestore. Dispatching to store...`);
                            console.log(fetchedEvent);
                            this.store.dispatch(getEventSuccess({ payload: fetchedEvent }));
                            return true;
                        } else {
                            console.log(`[EventExistsGuard] Event does not exist. Redirecting...`);
                            return this.router.createUrlTree(['/events']);
                        }
                    }),
                    catchError(() => {
                        console.log(`[EventExistsGuard] Error fetching event. Redirecting...`);
                        return of(this.router.createUrlTree(['/events']));
                    })
                );
            })
        );
    }
}
