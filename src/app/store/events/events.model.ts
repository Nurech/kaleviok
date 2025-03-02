import { Account } from '../accounts/account.model';

export interface Event {
    id: string;
    title?: string;
    description?: string;
    createdBy?: string;
    createdAt?: Date;
    modifiedBy?: string;
    modifiedAt?: Date;
    startDate?: Date;
    startTime?: Date;
    endDate?: Date;
    endTime?: Date;
}

export interface EventVM {
    event: Event;
    createdBy: Account | null;
}
