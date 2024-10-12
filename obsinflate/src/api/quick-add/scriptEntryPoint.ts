import { Parameters } from '@obsinflate/api/quick-add/parameters';

export type ScriptEntryPoint = (params: Parameters) => Promise<void>;
