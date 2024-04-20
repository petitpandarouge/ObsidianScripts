module.exports = async () => {
    const activeFile = app.workspace.getActiveFile();
    const {update} = app.plugins.plugins["metaedit"].api;	
    await update("aliases", activeFile.basename, activeFile.path);
}