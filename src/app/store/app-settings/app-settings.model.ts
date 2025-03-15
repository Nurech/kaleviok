export interface AppSetting {
    id: string;
    ACTIVE: boolean;
    ALLOWED_FILE_TYPES: string[];
    DEFAULT_MAX_FILES_EVENT_CREATE: number;
    MAX_UPLOAD_SIZE_PER_USER_IN_MB: number;
}
