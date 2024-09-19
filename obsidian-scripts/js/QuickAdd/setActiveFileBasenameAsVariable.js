module.exports = async (params) => {
    
	const baseVarName = "FileBasename";
	let activeFile = app.workspace.getActiveFile();
	if (activeFile) {
		let i = 1;
		while (params.variables[`${baseVarName}${i}`] !== undefined) { i++; }
		params.variables[`${baseVarName}${i}`] = activeFile.basename;
	}

};