import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, query, where, onSnapshot, getDocs, getDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Event } from './events.model';
import { selectAuthenticatedAccount } from '../auth/auth.selectors';
import { loadEventsSuccess } from './events.actions';
import { setDocClean } from '../../shared/interceptors/firebase-utils';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    private firestore = inject(Firestore);
    private store$ = inject(Store);
    private collectionName = 'events';
    private collectionRef = collection(this.firestore, this.collectionName);
    private listener?: () => void;

    constructor() {
        this.startListen();
    }

    // Start Listener for Events
    startListen(): void {
        this.store$.pipe(select(selectAuthenticatedAccount)).subscribe((user) => {
            if (!user) {
                return;
            }
            console.log(`Events listener started for user: ${user.uid}`);

            const eventsQuery = query(this.collectionRef);
            this.listener = onSnapshot(eventsQuery, (snapshot) => {
                const events: Event[] = [];
                snapshot.forEach((doc) => {
                    events.push(this.convertTimestampsToISO({ id: doc.id, ...doc.data() }));
                });

                this.store$.dispatch(loadEventsSuccess({ payload: events }));
            });
        });
    }

    upsert(event: Partial<Event>): Observable<Event> {
        const eventId = event.id || doc(this.collectionRef).id; // Generate ID if missing
        const updatedEvent = { ...event, id: eventId }; // ✅ Create a mutable copy
        const eventDocRef = doc(this.firestore, `events/${eventId}`);
        console.warn('Saving event:', updatedEvent);
        return from(setDocClean(eventDocRef, updatedEvent, { merge: true })).pipe(
            map(() => updatedEvent as Event) // ✅ Return event with ID
        );
    }

    private convertTimestampsToISO(event: any): Event {
        return {
            ...event,
            startDate: event.startDate?.seconds ? new Date(event.startDate.seconds * 1000).toISOString() : event.startDate,
            endDate: event.endDate?.seconds ? new Date(event.endDate.seconds * 1000).toISOString() : event.endDate,
            startTime: event.startTime?.seconds ? new Date(event.startTime.seconds * 1000).toISOString() : event.startTime,
            endTime: event.endTime?.seconds ? new Date(event.endTime.seconds * 1000).toISOString() : event.endTime,
            createdAt: event.createdAt?.seconds ? new Date(event.createdAt.seconds * 1000).toISOString() : event.createdAt,
            modifiedAt: event.modifiedAt?.seconds ? new Date(event.modifiedAt.seconds * 1000).toISOString() : event.modifiedAt
        };
    }

    getEventById(eventId: string): Observable<Event | null> {
        const eventDocRef = doc(this.firestore, `events/${eventId}`);
        return from(getDoc(eventDocRef)).pipe(map((docSnapshot) => (docSnapshot.exists() ? this.convertTimestampsToISO(docSnapshot.data()) : null)));
    }

    getUpcoming(): Observable<Event[]> {
        const now = new Date();
        const upcomingQuery = query(this.collectionRef, where('startDate', '>=', now));
        return from(getDocs(upcomingQuery).then((snapshot) => snapshot.docs.map((doc) => this.convertTimestampsToISO({ id: doc.id, ...doc.data() }))));
    }

    getPast(): Observable<Event[]> {
        const now = new Date();
        const pastQuery = query(this.collectionRef, where('endDate', '<', now));
        return from(getDocs(pastQuery).then((snapshot) => snapshot.docs.map((doc) => this.convertTimestampsToISO({ id: doc.id, ...doc.data() }))));
    }

    delete(eventId: string): Observable<void> {
        const eventDocRef = doc(this.firestore, `events/${eventId}`);
        return from(deleteDoc(eventDocRef));
    }
}
