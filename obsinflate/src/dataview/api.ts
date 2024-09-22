import { DataObject, Grouping, Literal, Link } from "@obsidian/dataview/data-model/value";
import { DataArray } from "@obsidian/dataview/api/data-array";
import { SListItem } from "@obsidian/dataview/data-model/serialized/markdown";
import * as Luxon from "luxon";
import { DateTime, Duration } from "luxon";

/**
 * v0.5.67  
 * https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/
 */
export interface Api {
    luxon: typeof Luxon;
    // Query
    current: () => DataObject | undefined
    page: (path: string) => DataObject | undefined
    pages: (query?: string) => DataArray<DataObject>
    pagePaths: (query?: string) => DataArray<string>
    // Render
    el: (element: string, text: string) => void
    header: (level: number, text: string) => void
    paragraph: (text: string) => void
    span: (text: string) => void
    execute: (query: string) => void
    executeJs: (code: string) => void
    view: (path: string, input: { [key: string]: Literal }) => void
    // Dataviews
    list: (items: any[] | DataArray<any>) => void
    taskList: (tasks: Grouping<SListItem>, groupByFile: boolean) => void
    table: (headers: string[], values: any[][] | DataArray<any> | undefined ) => void
    // Markdown Dataviews
    markdownList: (items: any[] | DataArray<any>) => void
    markdownTaskList: (tasks: Grouping<SListItem>, groupByFile: boolean) => void
    markdownTable: (headers: string[], values: any[][] | DataArray<any> | undefined ) => void
    // Utility
    array: (raw: any) => DataArray<any>;
    isArray: (raw: any) => raw is DataArray<any> | Array<any>;
    isDataArray: (raw: any) => raw is DataArray<any>;

    // embed = false by default
    fileLink(path: string, embed?: boolean, display?: string): Link;
    // embed = false by default
    sectionLink(path: string, section: string, embed?: boolean, display?: string): Link;
    // embed = false by default
    blockLink(path: string, blockId: string, embed?: boolean, display?: string): Link;
    date(pathlike: string | Link | DateTime): DateTime | null;
    duration(dur: string | Duration): Duration | null;
    parse(value: string): Literal;
    literal(value: any): Literal;
    clone(value: Literal): Literal;
    compare(a: any, b: any): number;
    equal(a: any, b: any): boolean;
}