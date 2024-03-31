// INPUTS
let {commands} = input;

// RENDER
let displayedArray = [];
for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    const hotkeyButton = dv.el('button', hotkeyToString(command.hotkey));
    hotkeyButton.onclick = () => {
        openHotkeySettingByHotkey(command.hotkey);
    };
    const actionButton = dv.el('button', command.label);
    actionButton.onclick = () => {
        openHotkeySettingByCommandId(command.id);
    };
    displayedArray.push([hotkeyButton, actionButton])
}

dv.table(
	["Raccourcis", "Commandes"], 
	displayedArray
);

// UTILS
function openHotkeySettingByCommandId(commandId) {
    app.setting.open();
    const tab = app.setting.openTabById('hotkeys');
    tab.setQuery(commandId);
}

function openHotkeySettingByHotkey(hotkey) {
    app.setting.open();
    const tab = app.setting.openTabById('hotkeys');
    tab.setHotkeyFilter(hotkey);
}

function hotkeyToString(hotkey) {
    let string = hotkey.modifiers.join(" + ");
    string += ` + ${hotkey.key}`;
    return string;
}