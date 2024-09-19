export interface Command {
    id: string;
    name: string;
    callback: () => Promise<void>;
}