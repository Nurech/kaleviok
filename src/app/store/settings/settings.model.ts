export interface Settings {
    uid: string;
    userSettings: Setting[];
}

export interface Setting {
    key: string;
    value: string;
    description: string;
    icon?: string;
}
