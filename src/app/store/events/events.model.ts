import { Account } from '../accounts/account.model';

export enum EventStatus {
    DRAFT = 'draft',
    REVIEW = 'review',
    PUBLISHED = 'published',
    REJECTED = 'rejected'
}

export interface IEvent {
    id: string;
    status: EventStatus;
    title?: string;
    description?: string;
    createdBy?: string;
    createdAt?: string;
    modifiedBy?: string;
    modifiedAt?: string;
    startDate?: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;
}

export interface EventVM {
    event: IEvent | null;
    createdBy: Account | null;
}
