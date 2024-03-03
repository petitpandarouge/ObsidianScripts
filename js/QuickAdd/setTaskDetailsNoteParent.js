module.exports = async (params) => {
    const {quickAddApi: {inputPrompt, suggester}} = params;
    const {update, getPropertiesInFile} = app.plugins.plugins["metaedit"].api;	
    await update("parents", "[[" + params.variables["ActiveFileBasename"] + "]]", params.variables["NewFileFullname"]);
}