module.exports = async (params) => {
    	
	let activeFile = app.workspace.getActiveFile();
	if (activeFile) {
		params.variables["ActiveFileBasename"] = activeFile.basename;
		
		let activeFileFolder = app.fileManager.getNewFileParent(activeFile.path);
		if (activeFileFolder) {
			newFileBasePath = activeFileFolder.path;
			
			let date = new Date();
			let newFileBaseName = date
				.toISOString()
				.replace(/-/g, '')
				.replace(/T/g, '')
				.replace(/\.[0-9]+Z/g, '') // remove the miliseconds.
				.replace(/:/g, '');
			
			params.variables["NewFileBasename"] = newFileBaseName;
			params.variables["NewFileRelativeFullname"] = activeFile.basename + "/" + newFileBaseName + ".md";
			params.variables["NewFileFullname"] = newFileBasePath + "/" + activeFile.basename + "/" + newFileBaseName + ".md";
		}
	}
	
	// TODO : else prompt the list of projects.

};