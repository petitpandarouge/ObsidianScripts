// INPUTS
let {commands} = input;

// CONFIGURATION
let commandsConfig = getConfiguration();

// RENDER
let applyHotkeysButton = dv.el('button', 'Apply hotkeys');
applyHotkeysButton.onclick = applyHotkeys;

let displayedArray = [];
for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    const hotkeyButton = dv.el('button', hotkeyToString(command.hotkey));
    hotkeyButton.onclick = () => openHotkeySettingByHotkey(command.hotkey);
    let commandLabel = "INVALID ID"
    if (commandsConfig.commands[command.id]) {
        commandLabel = commandsConfig.commands[command.id].name;
        if (command.doc) {
            commandLabel = dv.fileLink(command.doc, false, commandsConfig.commands[command.id].name);
        }
    } else {
        new Notice(`Unable to find a command for the "${command.id}" id.`, 5000)
    }
    displayedArray.push([hotkeyButton, commandLabel])
}

dv.table(
	["Raccourcis", "Commandes"], 
	displayedArray
);


// UTILS
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

function getConfiguration() {
    let config = {
        commands: {},
        hotkeys: {}
    }
    Object.values(app.commands.commands)
        .forEach(cmd => {
            config.commands[cmd.id] = { 
                id: cmd.id,
                name: cmd.name,
                hotkeys: []
            };
            
            let defaultKeys = app.hotkeyManager.getDefaultHotkeys(cmd.id);
            if (defaultKeys && defaultKeys.length > 0) {
                config.commands[cmd.id].hotkeys = defaultKeys;
            }
        
            let customKeys = app.hotkeyManager.getHotkeys(cmd.id);
            if ( customKeys && customKeys.length >= 0 ) {
                config.commands[cmd.id].hotkeys = customKeys;
            }

            if (config.commands[cmd.id].hotkeys.length > 0)  {
                for (let hotkey of config.commands[cmd.id].hotkeys) {
                    const keyCombo = hotkeyToString(hotkey)
                    if (!(keyCombo in config.hotkeys)) {
                        config.hotkeys[keyCombo]  = []
                    }

                    config.hotkeys[keyCombo].push(cmd.name)
                }  
            }    
        })

    return config;
}

function applyHotkeys() {
    for (let i = 0; i < commands.length; i++) {
        const command = commands[i]
        if (commandsConfig.commands[command.id]) {
            let hotkeys = []
            hotkeys.push(command.hotkey)
            app.hotkeyManager.setHotkeys(command.id, hotkeys)
            let commandName = commandsConfig.commands[command.id].name
            let hotkey = hotkeyToString(command.hotkey)
            new Notice(`The "${hotkey}" hotkey has been set to the command "${commandName}" successfully.`, 5000)
        } 
    }
}
