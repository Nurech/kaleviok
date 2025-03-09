import { Account } from '../accounts/account.model';

export interface IEvent {
    id: string;
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
    published: boolean;
    publishedAt?: string;
}

export interface EventVM {
    event: IEvent;
    createdBy: Account | null;
}
