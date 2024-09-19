module.exports = {}

module.exports.onload = async (plugin) => {
	plugin.addCommand({
		id: 'new-project',
		name: 'Create new project structure from empty note',
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

			let projectFolderName = activeFile.basename;
			let projectFolderPath = activeFileFolderPath + projectFolderName;
			await plugin.app.vault.createFolder(projectFolderPath);

			let newActiveFilePath = projectFolderPath + "/" + activeFile.basename.toUpperCase() + "." + activeFile.extension;
			await plugin.app.vault.rename(activeFile, newActiveFilePath);

			// Voir si possibilité d'appliquer le template.
		}
	});
}