module.exports = {}

module.exports.onload = async (plugin) => {
	const MarkdownView = plugin.passedModules.obsidian.MarkdownView
	plugin.addCommand({
		id: 'new-unique-note-in-current-folder',
		name: 'Create new unique note in current folder',
		callback: async () => {
            let newFileBasePath = "";
            let activeFile = plugin.app.workspace.getActiveFile();
            if (activeFile) {
                let activeFileFolder = plugin.app.fileManager.getNewFileParent(activeFile.path);
                if (activeFileFolder) {
                    newFileBasePath = activeFileFolder.path + "/";
                }
            }

			let version = 0;
			let created_note;
			let isCreated;
			do {
				let date = moment();
				date.add(version, 'minutes');
				let newFileBaseName = date.format('YYYYmmDDHHmm');
				let newFilePath = newFileBasePath + newFileBaseName + ".md";
				try {
					created_note = await plugin.app.vault.create(newFilePath, '');
					isCreated = true
				} catch {
					version += 1;
					isCreated = false;
				}
			} while (isCreated === false);
			
			const active_leaf = plugin.app.workspace.activeLeaf;
			if (!active_leaf) {
				return;
			}
			await active_leaf.openFile(created_note, {
				state: { mode: "source" },
			});
			plugin.app.workspace.trigger("create",created_note)
			const view = app.workspace.getActiveViewOfType(MarkdownView);
			if (view) {
				view.editor.focus()
			}
		}
	});
}