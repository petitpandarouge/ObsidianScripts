module.exports = async (params) => {
    const projectsFile = app.vault.getAbstractFileByPath("REQUETES/Projets.md");
    let leaf = app.workspace.getLeafById("dce9100844ff524f");
    if (!leaf) {
        leaf = app.workspace.activeLeaf;
        if (!leaf) {
            return;
        }
    }
    await leaf.openFile(projectsFile);
    const view = app.workspace.getActiveViewOfType(params.obsidian.MarkdownView);
    if (view) {
        view.editor.focus();
    }
}