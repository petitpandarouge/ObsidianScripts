import { Parameters } from '@obsinflate/quick-add/parameters';

export type ScriptEntryPoint = (params?: Parameters) => Promise<void>;
