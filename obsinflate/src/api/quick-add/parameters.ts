﻿import { App } from 'obsidian';
import { Api } from '@obsinflate/api/quick-add/api';

export interface Parameters {
    app: App;
    quickAddApi: Api;
    variables: { [key: string]: string | number };
}
