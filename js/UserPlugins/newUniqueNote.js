module.exports = {}

module.exports.onload = async (plugin) => {
	const MarkdownView = plugin.passedModules.obsidian.MarkdownView
	plugin.addCommand({
		id: 'new-unique-note-in-current-folder',
		name: 'Create new unique note in folder of the center panel active note',
		callback: async () => {

			let isInSideBar = function(leaf, side) {
				return leaf.parent.containerEl.hasClass(`mod-top-${side}-space`);
			}
			let isInCenterPanel = function(leaf) {
				return !isInSideBar(leaf, "right") && !isInSideBar(leaf, "left");
			}
			let hasTabActive = function(leaf) {
				return leaf.tabHeaderEl.hasClass('is-active');
			}

			const leaf = app.workspace.getLeavesOfType("markdown").find(leaf => 
				isInCenterPanel(leaf) && 
				hasTabActive(leaf)
				);
			if (!leaf) {
				return;
			}

            let newFileBasePath = "/";
			const activeFileFolder = plugin.app.fileManager.getNewFileParent(leaf.view.file.path);
			if (activeFileFolder) {
				newFileBasePath = activeFileFolder.path + "/";
			}

			let version = 0;
			let createdNote;
			let isCreated;
			do {
				let date = moment();
				date.add(version, 'minutes');
				let newFileBaseName = date.format('YYYYmmDDHHmm');
				let newFilePath = newFileBasePath + newFileBaseName + ".md";
				try {
					createdNote = await plugin.app.vault.create(newFilePath, '');
					isCreated = true
				} catch {
					version += 1;
					isCreated = false;
				}
			} while (isCreated === false);

			
			app.workspace.setActiveLeaf(leaf);
			await leaf.openFile(createdNote, {
				state: { mode: "source" },
				});
			plugin.app.workspace.trigger("create", createdNote);
			leaf.view.editor.focus();
		}
	});
}