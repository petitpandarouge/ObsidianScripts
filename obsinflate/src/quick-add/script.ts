import { Parameters } from '@obsinflate/quick-add/parameters';

export type Script = (params?: Parameters) => Promise<void>;
