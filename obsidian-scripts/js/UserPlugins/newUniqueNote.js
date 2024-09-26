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
			let getFolderPathFrom = function(leaf) {
				const activeFileFolder = plugin.app.fileManager.getNewFileParent(leaf.view.file.path);
				return activeFileFolder.path + "/";
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

			let OpenFileOptions = function() {}
			OpenFileOptions.prototype.inSourceMode = function() {
				if (!this.state) {
					this.state = {};
				}
				this.state = {
					...this.state,
					mode: "source"
				};
				return this;
			}
			OpenFileOptions.prototype.withFocusAtTheEndOfTitle = function() {
				if (!this.state) {
					this.eState = {};
				}
				this.eState = {
					...this.eState,
					rename: 'end'
				};
				return this;
			}

			// Implementation.

			const leaf = app.workspace.getLeavesOfType("markdown").find(leaf => 
				isInCenterPanel(leaf) && 
				hasTabActive(leaf)
				);
			if (!leaf) {
				new Notice("No leaf found in the center panel.", 3000);
				return;
			}

            const newFileBasePath = getFolderPathFrom(leaf);
			const createdNote = await createUniqueNote(newFileBasePath);
			app.workspace.setActiveLeaf(leaf);
			await leaf.openFile(createdNote, 
				(new OpenFileOptions())
					.inSourceMode()
					.withFocusAtTheEndOfTitle()
				);
			plugin.app.workspace.trigger("create", createdNote);

			new Notice(`The note ${createdNote.path} has been successfully created.`, 3000);
		}
	});
}