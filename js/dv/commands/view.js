//#region UTILS

class Hotkey {
    constructor(hotkey) {
        this.modifiers = hotkey.modifiers;
        this.key = hotkey.key;
    }

    toString() {
        let modifiersAsString = this.modifiers
            .sort(Sort.ctrlAlwaysFirst)
            .join(" + ")
            .replace('Mod', 'Ctrl')
        let keyAsString = this.key.length == 1 ?
            this.key.toUpperCase() :
            this.key
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
}

class CustomCommand {
    constructor(command) {
        this.id = command.id;
        this.hotkey = new Hotkey(command.hotkey);
        this.doc = command.doc;
    }
}

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
            hotkeys = defaultHotkeys.map((hotkey) => new Hotkey(hotkey));
        }

        let customHotkeys = app.hotkeyManager.getHotkeys(this.id);
        if (this.#atLeastOneHotkeyExists(customHotkeys) ||
            this.#defaultHotkeysErased(customHotkeys)) {
            hotkeys = customHotkeys.map((hotkey) => new Hotkey(hotkey));
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
                const keyCombo = hotkey.toString()
                if (!(keyCombo in this.hotkeysByStringToCommands)) {
                    this.hotkeysByStringToCommands[keyCombo]  = []
                }

                this.hotkeysByStringToCommands[keyCombo].push(obsidianCommand.name)
            }  
        }
    }

    #notifyHotkeyApplied(customCommand) {
        let commandName = this.commandsByid[customCommand.id].name
        let hotkey = customCommand.hotkey.toString()
        new Notice(`The "${hotkey}" hotkey has been set to the command "${commandName}" successfully.`, 5000)
    }

    applyHotkey(customCommand) {
        let hotkeys = []
        hotkeys.push(customCommand.hotkey)
        app.hotkeyManager.setHotkeys(customCommand.id, hotkeys)
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

    applyHotkeys(customCommands) {
        for (let i = 0; i < customCommands.length; i++) {
            const customCommand = customCommands[i]
            if (this.commandExists(customCommand.id)) {
                this.applyHotkey(customCommand);
                this.#notifyHotkeyApplied(customCommand);
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

class Sort {
    static ctrlAlwaysFirst(a, b) {
        return (a === 'Mod' || a === 'Ctrl') ? -1 : 1;
    }
}

function displayApplyHotkeysButton() {
    let applyHotkeysButton = dv.el('button', 'Appliquer les raccourcis', {cls: "whide"});
    applyHotkeysButton.onclick = () => obsidianSettings.applyHotkeys(customCommands);
}

function displayCommandsArray() {
    let displayedArray = [];
    for (let i = 0; i < customCommands.length; i++) {
        const customCommand = customCommands[i];
        const hotkeyButton = buildCommandHotkeyButton(customCommand);
        const label = buildCommandLabel(customCommand);
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

function buildCommandHotkeyButton(customCommand) {
    const hotkeyAsString = customCommand.hotkey.toString();
    const hotkeyButton = dv.el('button', hotkeyAsString, {cls: "clickable-icon"});
    hotkeyButton.onclick = () => obsidianSettings.openHotkeySettingByHotkey(customCommand.hotkey);
    if (obsidianSettings.hotkeyNotBoundToCommand(hotkeyAsString) ||
        obsidianSettings.hotkeyBoundToMoreThanOneCommand(hotkeyAsString)) {
        hotkeyButton.addClass("error");
    }
    return hotkeyButton;
}

function buildCommandLabel(customCommand) {
    let commandLabel = "INVALID ID"
    if (obsidianSettings.commandExists(customCommand.id)) {
        commandLabel = obsidianSettings.commandsByid[customCommand.id].name;
        if (customCommand.doc) {
            commandLabel = dv.fileLink(customCommand.doc, false, obsidianSettings.commandsByid[customCommand.id].name);
        }
    } else {
        new Notice(`Unable to find a command for the "${customCommand.id}" id.`, 5000)
    }
    return commandLabel;
}

//#endregion

// INPUTS
const {commands, filterByName} = input;
const customCommands = commands.map((command) => new CustomCommand(command));

// CONFIGURATION
const obsidianSettings = new ObsidianSettings();

// RENDER
displayApplyHotkeysButton();
displayCommandsArray();
displayObsidianCommands();
