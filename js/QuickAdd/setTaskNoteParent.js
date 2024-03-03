module.exports = async (params) => {
    const {update} = app.plugins.plugins["metaedit"].api;	
    debugger
    await update("tache de", "[[" + params.variables["FileBasename1"] + "]]", params.variables["FilePath1"]);
}