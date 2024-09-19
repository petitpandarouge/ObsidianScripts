module.exports = async (params) => {
    const propertyName = "parents";
    const {update, getPropertyValue} = app.plugins.plugins["metaedit"].api;	

    debugger
    let parents = await getPropertyValue(propertyName, params.variables["FilePath1"]);
    if (!parents) {
        parents = [];
    }
    parents.push("[[" + params.variables["FileBasename1"] + "]]");
    await update("parents", parents, params.variables["FilePath1"]);
}