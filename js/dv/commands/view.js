//#region UTILS

class Hotkey {
    constructor(hotkey) {
        this.modifiers = hotkey.modifiers;
        this.key = hotkey.key;
    }

    static #diplayStringSeparator = "+";
    static modModifier = "Mod";
    static ctrlModifier = "Ctrl";

    toString() {
        let modifiersAsString = this.modifiers
            .sort(Sort.ctrlAlwaysFirst)
            .join(` ${Hotkey.#diplayStringSeparator} `)
            .replace(Hotkey.modModifier, Hotkey.ctrlModifier)
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
            return `${modifiersAsString} ${Hotkey.#diplayStringSeparator} ${keyAsString}`;
        }
    }
}

class CustomCommand {
    constructor(command) {
        this.id = command.id;
        this.hotkey = new Hotkey(command.hotkey);
        this.doc = command.doc;
    }

    buildHotkeyButton() {
        const hotkeyAsString = this.hotkey.toString();
        const hotkeyButton = dv.el('button', hotkeyAsString, {cls: "clickable-icon"});
        hotkeyButton.onclick = () => obsidianSettings.openHotkeySettingByHotkey(this.hotkey);
        if (obsidianSettings.hotkeyNotBoundToCommand(hotkeyAsString) ||
            obsidianSettings.hotkeyBoundToMoreThanOneCommand(hotkeyAsString)) {
            hotkeyButton.addClass("error");
        }
        return hotkeyButton;
    }

    buildLabel() {
        let commandLabel = "INVALID ID"
        if (obsidianSettings.commandExists(this.id)) {
            commandLabel = obsidianSettings.commandsByid[this.id].name;
            if (this.doc) {
                commandLabel = dv.fileLink(this.doc, false, obsidianSettings.commandsByid[this.id].name);
            }
        } else {
            new Notice(`Unable to find a command for the "${this.id}" id.`, 5000)
        }
        return commandLabel;
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
        for (let customCommand of customCommands) {
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
        return (a === Hotkey.modModifier || a === Hotkey.ctrlModifier) ? -1 : 1;
    }
}

function displayApplyHotkeysButton() {
    let applyHotkeysButton = dv.el('button', 'Appliquer les raccourcis', {cls: "whide"});
    applyHotkeysButton.onclick = () => obsidianSettings.applyHotkeys(customCommands);
}

function displayCommandsArray() {
    let displayedArray = [];
    for (let customCommand of customCommands) {
        debugger
        const hotkeyButton = customCommand.buildHotkeyButton();
        const label = customCommand.buildLabel();
        displayedArray.push([hotkeyButton, label])
    }
    
    dv.table(
        ["Raccourcis", "Commandes"], 
        displayedArray
    );
}

function trydisplayFilteredObsidianCommands() {
    if (filterByName) {
        dv.header(1, `Commandes Obsidian pour le nom "\\*${filterByName}\\*"`);
        
        let displayedArray = [];
        const obsidianCommands = Object.values(obsidianSettings.commandsByid);
        for (let command of obsidianCommands) {
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

//#endregion

// INPUTS
let {commands: customCommands, filterByName} = input;
customCommands = customCommands.map((command) => new CustomCommand(command));

// CONFIGURATION
const obsidianSettings = new ObsidianSettings();

// RENDER
displayApplyHotkeysButton();
displayCommandsArray();
trydisplayFilteredObsidianCommands();
