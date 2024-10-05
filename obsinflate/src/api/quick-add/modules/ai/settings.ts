import { ModelOptions } from '@obsinflate/api/quick-add/modules/ai/modelOptions';

export interface Settings {
    variableName: string;
    shouldAssignVariables: boolean;
    modelOptions: Partial<ModelOptions>;
    showAssistantMessages: boolean;
    systemPrompt: string;
}
