// INPUTS
let {hotkeys} = input;

// RENDER
let displayedArray = [];
for (let i = 0; i < hotkeys.length; i++) {
    const hotkey = hotkeys[i];
    const hotkeyButton = dv.el('button', hotkey.hotkey);
    hotkeyButton.onclick = () => {
        new Notice(hotkey.hotkey, 3000);
    };
    const actionButton = dv.el('button', hotkey.label);
    actionButton.onclick = () => {
        new Notice(hotkey.id, 3000);
    };
    displayedArray.push([hotkeyButton, actionButton])
}

dv.table(
	["Raccourcis", "Actions"], 
	displayedArray
);

// UTILS
function openHotkeySettingByCommandid(commandId) {

}

function openHotkeySettingByHotkey(hotkey) {

}
