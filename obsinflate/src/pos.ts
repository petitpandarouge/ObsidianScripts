﻿import { Loc } from "@obsidian/loc";

export interface Pos {
    /**
     * Starting location.
     * @public
     */
    start: Loc;
    /**
     * End location.
     * @public
     */
    end: Loc;
}