import { Parameters } from '@obsinflate/quick-add/parameters';

export interface Script {
    entry: (params?: Parameters) => Promise<void>;
}
