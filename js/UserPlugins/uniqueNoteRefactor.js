module.exports = {}

module.exports.onload = async (plugin) => {
	const MarkdownView = plugin.passedModules.obsidian.MarkdownView
	plugin.addCommand({
		id: 'unique-note-refactor',
		name: 'Makes an existing note unique',
		callback: async () => {
            let activeFile = plugin.app.workspace.getActiveFile();
            if (!activeFile) {
				return;
            }

			let activeFileFolderPath = "";
			let activeFileFolder = activeFile.parent;
			if (activeFileFolder) {
				activeFileFolderPath = activeFileFolder.path + "/";
			}

			let version = 0;
			let isRenamed;
			do {
				// activeFile.stat.ctime
				let date = new Date(activeFile.stat.ctime);
				date.setMinutes(date.getMinutes() + version);
				let fileUniqueTag = date
					.toISOString()
					.replace(/-/g, '')
					.replace(/T/g, '')
					.replace(/:[0-9]+\.[0-9]+Z/g, '') // remove the seconds and the miliseconds.
					.replace(/:/g, '');
				let newActiveFilePath = activeFileFolderPath + fileUniqueTag + " - " + activeFile.basename + ".md";
				try {
					await plugin.app.fileManager.renameFile(activeFile, newActiveFilePath);
					isRenamed = true
				} catch {
					version += 1;
					isRenamed = false;
				}
			} while (isRenamed === false);
		}
	});
}