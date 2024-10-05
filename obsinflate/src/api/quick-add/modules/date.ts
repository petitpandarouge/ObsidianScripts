export interface Date {
    now: (format?: string, offset?: number) => void;
    tomorrow: (format?: string) => void;
    yesterday: (format?: string) => void;
}
