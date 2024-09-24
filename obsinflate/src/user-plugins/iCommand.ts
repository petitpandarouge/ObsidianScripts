export interface ICommand {
    id: string;
    name: string;
    callback: () => Promise<void>;
}
