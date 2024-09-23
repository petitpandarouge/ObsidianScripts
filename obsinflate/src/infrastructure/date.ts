export interface Date {
    format(format: string): string;
    add(amount: number, unit: string): void;
}
