export interface Event {
    id: string;
    title?: string;
    createdBy?: string;
    createdAt?: Date;
    modifiedBy?: string;
    modifiedAt?: Date;
    startDate?: Date;
    startTime?: Date;
    endDate?: Date;
    endTime?: Date;
}
