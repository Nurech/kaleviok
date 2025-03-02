import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc, query, where, onSnapshot, getDocs } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Event } from './events.model';
import { selectAuthenticatedAccount } from '../auth/auth.selectors';
import { loadEventsSuccess } from './events.actions';

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

    // Save or Update Event
    upsert(event: Partial<Event>): Observable<void> {
        const eventId = event.id || doc(collection(this.firestore, this.collectionName)).id;
        const eventDocRef = doc(this.firestore, `${this.collectionName}/${eventId}`);
        const eventData: Event = {
            id: eventId,
            title: event.title || '',
            createdAt: event.createdAt || new Date(),
            lastModified: new Date(),
            createdBy: event.createdBy || '',
            startDate: event.startDate || new Date(),
            startTime: event.startTime || new Date(),
            endDate: event.endDate || new Date(),
            endTime: event.endTime || new Date()
        };
        return from(setDoc(eventDocRef, eventData, { merge: true }));
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
                    events.push({ id: doc.id, ...doc.data() } as Event);
                });

                this.store$.dispatch(loadEventsSuccess({ data: events }));
            });
        });
    }

    // Stop Listener
    stopListen(): void {
        if (this.listener) {
            this.listener();
            this.listener = undefined;
            console.log(`${this.collectionName} listener stopped.`);
        } else {
            console.log(`${this.collectionName} listener is not active.`);
        }
    }

    // Get Upcoming Events
    getUpcoming(): Observable<Event[]> {
        const now = new Date();
        const upcomingQuery = query(this.collectionRef, where('start', '>=', now));
        return from(
            getDocs(upcomingQuery).then((snapshot) =>
                snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Event)
            )
        );
    }

    // Get Past Events
    getPast(): Observable<Event[]> {
        const now = new Date();
        const pastQuery = query(this.collectionRef, where('end', '<', now));
        return from(
            getDocs(pastQuery).then((snapshot) => snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Event))
        );
    }

    // Get User-Created Events
    getUserCreated(userId: string): Observable<Event[]> {
        const userQuery = query(this.collectionRef, where('createdBy', '==', userId));
        return from(
            getDocs(userQuery).then((snapshot) => snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Event))
        );
    }
}
