import { Parameters } from "@obsidian/quick-add/parameters";

export type Script = (params?: Parameters) => Promise<void>;