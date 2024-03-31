// INPUTS
let {hotkeys} = input;

// RENDER
let displayedArray = [];
for (let i = 0; i < hotkeys.length; i++) {
    const hotkey = hotkeys[i];
    const hotkeyButton = dv.el('button', hotkeyToString(hotkey.hotkey));
    hotkeyButton.onclick = () => {
        openHotkeySettingByHotkey(hotkey.hotkey);
    };
    const actionButton = dv.el('button', hotkey.label);
    actionButton.onclick = () => {
        openHotkeySettingByCommandId(hotkey.id);
    };
    displayedArray.push([hotkeyButton, actionButton])
}

dv.table(
	["Raccourcis", "Actions"], 
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