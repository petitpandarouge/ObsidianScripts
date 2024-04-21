//#region UTILS

class ObsidianConfiguration {
    constructor() {
        this.commands = {};
        this.hotkeys = {};
        this.#fill();
    }

    #fill() {
        Object.values(app.commands.commands)
            .forEach(cmd => {
                this.commands[cmd.id] = { 
                    id: cmd.id,
                    name: cmd.name,
                    hotkeys: []
                };
                
                let defaultKeys = app.hotkeyManager.getDefaultHotkeys(cmd.id);
                if (defaultKeys && defaultKeys.length > 0) {
                    this.commands[cmd.id].hotkeys = defaultKeys;
                }
            
                let customKeys = app.hotkeyManager.getHotkeys(cmd.id);
                if ( customKeys && customKeys.length >= 0 ) {
                    this.commands[cmd.id].hotkeys = customKeys;
                }

                if (this.commands[cmd.id].hotkeys.length > 0)  {
                    for (let hotkey of this.commands[cmd.id].hotkeys) {
                        const keyCombo = hotkeyToString(hotkey)
                        if (!(keyCombo in this.hotkeys)) {
                            this.hotkeys[keyCombo]  = []
                        }

                        this.hotkeys[keyCombo].push(cmd.name)
                    }  
                }    
            })
    }

    hotkeyNotBoundToCommand(hotkeyAsString) {
        return !this.hotkeys[hotkeyAsString];
    }

    hotkeyBoundToMoreThanOneCommand(hotkeyAsString) {
        return this.hotkeys[hotkeyAsString].length > 1;
    }

    commandExists(commandId) {
        return obsidianConfig.commands[commandId];
    }
}

function displayApplyHotkeysButton() {
    let applyHotkeysButton = dv.el('button', 'Appliquer les raccourcis', {cls: "whide"});
    applyHotkeysButton.onclick = applyHotkeys;
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
        const obsidianCommands = Object.values(obsidianConfig.commands);
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

function searchObsidianCommands() {
    
}

function buildCommandHotkeyButton(command) {
    const hotkeyAsString = hotkeyToString(command.hotkey);
    const hotkeyButton = dv.el('button', hotkeyAsString, {cls: "clickable-icon"});
    hotkeyButton.onclick = () => openHotkeySettingByHotkey(command.hotkey);
    if (obsidianConfig.hotkeyNotBoundToCommand(hotkeyAsString) ||
        obsidianConfig.hotkeyBoundToMoreThanOneCommand(hotkeyAsString)) {
        hotkeyButton.addClass("error");
    }
    return hotkeyButton;
}

function buildCommandLabel(command) {
    let commandLabel = "INVALID ID"
    if (obsidianConfig.commandExists(command.id)) {
        commandLabel = obsidianConfig.commands[command.id].name;
        if (command.doc) {
            commandLabel = dv.fileLink(command.doc, false, obsidianConfig.commands[command.id].name);
        }
    } else {
        new Notice(`Unable to find a command for the "${command.id}" id.`, 5000)
    }
    return commandLabel;
}

function openHotkeySettingByHotkey(hotkey) {
    app.setting.open();
    const tab = app.setting.openTabById('hotkeys');
    tab.setHotkeyFilter(hotkey);
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

function applyHotkeys() {
    for (let i = 0; i < commands.length; i++) {
        const command = commands[i]
        if (obsidianConfig.commandExists(command.id)) {
            let hotkeys = []
            hotkeys.push(command.hotkey)
            app.hotkeyManager.setHotkeys(command.id, hotkeys)
            let commandName = obsidianConfig.commands[command.id].name
            let hotkey = hotkeyToString(command.hotkey)
            new Notice(`The "${hotkey}" hotkey has been set to the command "${commandName}" successfully.`, 5000)
        } 
    }
    app.hotkeyManager.bake()
    app.hotkeyManager.save()
}


//#endregion

// INPUTS
const {commands, filterByName} = input;

// CONFIGURATION
const obsidianConfig = new ObsidianConfiguration();

// RENDER
displayApplyHotkeysButton();
displayCommandsArray();
displayObsidianCommands();
