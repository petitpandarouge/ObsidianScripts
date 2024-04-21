module.exports = async () => {
    const activeFile = app.workspace.getActiveFile();
    const {update} = app.plugins.plugins["metaedit"].api;	
    const titleWithoutPrefix = activeFile.basename.replace(/(([\d|\ ]+[\-]) )/, "");
    await update("aliases", titleWithoutPrefix, activeFile.path);
}