import { Account } from '../accounts/account.model';
import { AppFile } from '../files/files.model';

export enum EventStatus {
    DRAFT = 'draft',
    REVIEW = 'review',
    REVIEW_OK = 'review_ok',
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
    files: AppFile[] | [];
    createdBy: Account | null;
}
