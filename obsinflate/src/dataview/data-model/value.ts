/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime, Duration } from "luxon";

export type DataObject = { [key: string]: Literal };

export type Literal =
    | boolean
    | number
    | string
    | DateTime
    | Duration
    | Array<Literal>
    | DataObject
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    | Function
    | null
    | Link;

export type GroupElement<T> = { key: Literal; rows: Grouping<T> };
export type Grouping<T> = T[] | GroupElement<T>[];

export interface Link {
    /** The file path this link points to. */   
    path: string;
    /** The display name associated with the link. */
    display?: string;
    /** The block ID or header this link points to within a file, if relevant. */
    subpath?: string;
    /** Is this link an embedded link (!)? */
    embed: boolean;
    /** The type of this link, which determines what 'subpath' refers to, if anything. */
    type: "file" | "header" | "block";

    /** Checks for link equality (i.e., that the links are pointing to the same exact location). */
    equals(other: Link): boolean;
    /** Convert this link to it's markdown representation. */
    toString(): string;
    /** Convert this link to a raw object which is serialization-friendly. */
    toObject(): Record<string, any>;
    /** Update this link with a new path. */
    withPath(path: string): Link;
    /** Return a new link which points to the same location but with a new display value. */
    withDisplay(display?: string): Link;
    /** Convert a file link into a link to a specific header. */
    withHeader(header: string): Link;
    /** Convert any link into a link to its file. */
    toFile(): Link;
    /** Convert this link into an embedded link. */
    toEmbed(): Link;
    /** Convert this link into a non-embedded link. */
    fromEmbed(): Link;
    /** Convert this link to markdown so it can be rendered. */
    markdown(): string;
    /** Convert the inner part of the link to something that Obsidian can open / understand. */
    obsidianLink(): string;
    /** The stripped name of the file this link points to. */
    fileName(): string;
}