export interface Loc {
    /**
     * Line number.
     * @public
     */
    line: number;
    /**
     * Column number.
     * @public
     */
    col: number;
    /**
     * Number of characters from the beginning of the file.
     * @public
     */
    offset: number;
}