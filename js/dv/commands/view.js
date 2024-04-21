//#region UTILS

class ObsidianCommand {
    constructor(appCommand) {
        this.id = appCommand.id;
        this.name = appCommand.name;
        this.hotkeys = this.#getHotkeys();
    }

    #getHotkeys() {
        let hotkeys = [];

        let defaultHotkeys = app.hotkeyManager.getDefaultHotkeys(this.id);
        if (this.#atLeastOneHotkeyExists(defaultHotkeys)) {
            hotkeys = defaultHotkeys;
        }

        let customHotkeys = app.hotkeyManager.getHotkeys(this.id);
        if (this.#atLeastOneHotkeyExists(customHotkeys) ||
            this.#defaultHotkeysErased(customHotkeys)) {
            hotkeys = customHotkeys;
        }

        return hotkeys;
    }

    #atLeastOneHotkeyExists(hotkeys) {
        return hotkeys && hotkeys.length > 0;
    }

    #defaultHotkeysErased(hotkeys) {
        return hotkeys && hotkeys.length === 0;
    }
}

class ObsidianSettings {
    constructor() {
        this.commandsByid = {}; 
        this.hotkeysByStringToCommands = {}; 
        this.#fill();
    }

    #fill() {
        Object.values(app.commands.commands)
            .forEach(appCommand => {
                const obsidianCommand = this.#registerAppCommand(appCommand);
                this.#mapAppHotkeysToAppCommands(obsidianCommand);
            })
    }

    #registerAppCommand(appCommand) {
        const command = new ObsidianCommand(appCommand);
        this.commandsByid[appCommand.id] = command;
        return command;
    }

    #mapAppHotkeysToAppCommands(obsidianCommand) {
        if (this.commandsByid[obsidianCommand.id].hotkeys.length > 0)  {
            for (let hotkey of this.commandsByid[obsidianCommand.id].hotkeys) {
                const keyCombo = hotkeyToString(hotkey)
                if (!(keyCombo in this.hotkeysByStringToCommands)) {
                    this.hotkeysByStringToCommands[keyCombo]  = []
                }

                this.hotkeysByStringToCommands[keyCombo].push(obsidianCommand.name)
            }  
        }
    }

    #notifyHotkeyApplied(command) {
        let commandName = this.commandsByid[command.id].name
        let hotkey = hotkeyToString(command.hotkey)
        new Notice(`The "${hotkey}" hotkey has been set to the command "${commandName}" successfully.`, 5000)
    }

    applyHotkey(command) {
        let hotkeys = []
        hotkeys.push(command.hotkey)
        app.hotkeyManager.setHotkeys(command.id, hotkeys)
    }

    hotkeyNotBoundToCommand(hotkeyAsString) {
        return !this.hotkeysByStringToCommands[hotkeyAsString];
    }

    hotkeyBoundToMoreThanOneCommand(hotkeyAsString) {
        return this.hotkeysByStringToCommands[hotkeyAsString].length > 1;
    }

    commandExists(commandId) {
        return obsidianSettings.commandsByid[commandId];
    }

    applyHotkeys(commands) {
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i]
            if (this.commandExists(command.id)) {
                this.applyHotkey(command);
                this.#notifyHotkeyApplied(command);
            } 
        }
        this.save();
    }

    save() {
        app.hotkeyManager.bake()
        app.hotkeyManager.save()
    }

    openHotkeySettingByHotkey(hotkey) {
        app.setting.open();
        const tab = app.setting.openTabById('hotkeys');
        tab.setHotkeyFilter(hotkey);
    }
}

function displayApplyHotkeysButton() {
    let applyHotkeysButton = dv.el('button', 'Appliquer les raccourcis', {cls: "whide"});
    applyHotkeysButton.onclick = () => obsidianSettings.applyHotkeys(commands);
}

function displayCommandsArray() {
    let displayedArray = [];
    for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        const hotkeyButton = buildCommandHotkeyButton(command);
        const label = buildCommandLabel(command);
        displayedArray.push([hotkeyButton, label])
    }
    
    dv.table(
        ["Raccourcis", "Commandes"], 
        displayedArray
    );
}

function displayObsidianCommands() {
    if (filterByName) {
        dv.header(1, `Commandes Obsidian pour le nom "\\*${filterByName}\\*"`);
        
        let displayedArray = [];
        const obsidianCommands = Object.values(obsidianSettings.commandsByid);
        for (let i = 0; i < obsidianCommands.length; i++) {
            const command = obsidianCommands[i];
            if (command.name.toLowerCase().includes(filterByName.toLowerCase())) {
                displayedArray.push([command.name, command.id])
            }
        }

        dv.table(
            ["Nom", "Ids"], 
            displayedArray
        );
    }
}

function buildCommandHotkeyButton(command) {
    const hotkeyAsString = hotkeyToString(command.hotkey);
    const hotkeyButton = dv.el('button', hotkeyAsString, {cls: "clickable-icon"});
    hotkeyButton.onclick = () => obsidianSettings.openHotkeySettingByHotkey(command.hotkey);
    if (obsidianSettings.hotkeyNotBoundToCommand(hotkeyAsString) ||
        obsidianSettings.hotkeyBoundToMoreThanOneCommand(hotkeyAsString)) {
        hotkeyButton.addClass("error");
    }
    return hotkeyButton;
}

function buildCommandLabel(command) {
    let commandLabel = "INVALID ID"
    if (obsidianSettings.commandExists(command.id)) {
        commandLabel = obsidianSettings.commandsByid[command.id].name;
        if (command.doc) {
            commandLabel = dv.fileLink(command.doc, false, obsidianSettings.commandsByid[command.id].name);
        }
    } else {
        new Notice(`Unable to find a command for the "${command.id}" id.`, 5000)
    }
    return commandLabel;
}

function hotkeyToString(hotkey) {
    let modifiersAsString = hotkey.modifiers
        .sort(ctrlAlwaysFirst)
        .join(" + ")
        .replace('Mod', 'Ctrl')
    let keyAsString = hotkey.key.length == 1 ?
        hotkey.key.toUpperCase() :
        hotkey.key
            .replace('ArrowRight', '→')
            .replace('ArrowLeft', '←')
            .replace('ArrowUp', '↑')
            .replace('ArrowDown', '↓')
            .replace('PageUp', '↟')
            .replace('PageDown', '↡')
    if (modifiersAsString.length === 0) {
        return keyAsString;
    } else {
        return `${modifiersAsString} + ${keyAsString}`;
    }
}

function ctrlAlwaysFirst(a, b) {
    return (a === 'Mod' || a === 'Ctrl') ? -1 : 1;
}

//#endregion

// INPUTS
const {commands, filterByName} = input;

// CONFIGURATION
const obsidianSettings = new ObsidianSettings();

// RENDER
displayApplyHotkeysButton();
displayCommandsArray();
displayObsidianCommands();
