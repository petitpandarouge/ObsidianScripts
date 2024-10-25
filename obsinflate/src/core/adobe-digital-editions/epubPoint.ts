export class EpubPoint {
    constructor(
        public filePath: string,
        public pathComponents: number[],
        public offset: number
    ) {}
    static FromString(point: string): EpubPoint {
        const regex = /^([^#]+)#point\(((?:\/\d+)+):(\d+)\)$/;
        const match = point.match(regex);

        const filePath = match![1];
        const pathComponents = match![2].split('/').slice(1).map(Number);
        const offset = Number(match![3]);
        return new EpubPoint(filePath, pathComponents, offset);
    }
}
