export class PluginNotFoundError extends Error {
    constructor(pluginId: string) {
        super(`Plugin with id "${pluginId}" is not installed or enabled.`);
    }
}
