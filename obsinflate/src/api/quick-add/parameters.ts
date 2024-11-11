import { QuickAddApi } from '@obsinflate/api/quick-add/quickAddApi';
import { AppRuntime } from '@obsinflate/api/obsidian/appRuntime';

export interface Parameters {
    app: AppRuntime;
    quickAddApi: QuickAddApi;
    variables: { [key: string]: unknown };
}
