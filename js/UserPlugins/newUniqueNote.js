module.exports = {}

module.exports.onload = async (plugin) => {
	plugin.addCommand({
		id: 'new-unique-note-in-current-folder',
		name: 'Create new unique note in folder of the center panel active note',
		callback: async () => {

			// Functions.

			let isInSideBar = function(leaf, side) {
				return leaf.parent.containerEl.hasClass(`mod-top-${side}-space`);
			}
			let isInCenterPanel = function(leaf) {
				return !isInSideBar(leaf, "right") && !isInSideBar(leaf, "left");
			}
			let hasTabActive = function(leaf) {
				return leaf.tabHeaderEl.hasClass('is-active');
			}
			let getNewFileBasePathFrom = function(leaf) {
				const activeFileFolder = plugin.app.fileManager.getNewFileParent(leaf.view.file.path);
				if (activeFileFolder) {
					return activeFileFolder.path + "/";
				}
				return "/";
			}
			let createUniqueNote = async function(newFileBasePath) {
				let version = 0;
				let createdNote;
				let isCreated;
				do {
					let date = moment();
					date.add(version, 'minutes');
					let newFileBaseName = date.format('YYYYMMDDHHmm');
					let newFilePath = newFileBasePath + newFileBaseName + ".md";
					try {
						createdNote = await plugin.app.vault.create(newFilePath, '');
						isCreated = true
					} catch {
						version += 1;
						isCreated = false;
					}
				} while (isCreated === false);
				return createdNote;
			}
			let inSourceMode = function(createFileOption) {
				debugger
				if (!createFileOption.state) {
					createFileOption = {
						...createFileOption,
						state: {}
					};
				}
				createFileOption.state = {
					...createFileOption.state,
					mode: "source"
				};
				return createFileOption;
			}
			let withFocusAtTheEndOfTitle = function(createFileOption) {
				debugger
				if (!createFileOption.state) {
					createFileOption = {
						...createFileOption,
						eState: {}
					};
				}
				createFileOption.eState = {
					...createFileOption.eState,
					rename: 'end'
				};
				return createFileOption;
			}

			// Implementation.

			const leaf = app.workspace.getLeavesOfType("markdown").find(leaf => 
				isInCenterPanel(leaf) && 
				hasTabActive(leaf)
				);
			if (!leaf) {
				return;
			}

            const newFileBasePath = getNewFileBasePathFrom(leaf);
			const createdNote = await createUniqueNote(newFileBasePath);
			app.workspace.setActiveLeaf(leaf);
			await leaf.openFile(createdNote, 
				withFocusAtTheEndOfTitle(
				inSourceMode({})
				));
			plugin.app.workspace.trigger("create", createdNote);
		}
	});
}