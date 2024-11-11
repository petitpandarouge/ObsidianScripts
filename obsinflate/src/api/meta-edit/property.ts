export type Property = { key: string; content: unknown; type: MetaType };

export enum MetaType {
    YAML,
    Dataview,
    Tag,
    Option
}
