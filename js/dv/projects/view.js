let {filter} = input;

const rootNode = dv.el("div", "coucou");

// INIT
renderProjects();

// FUNCTIONS

function listErrors(project) {
	let explaination = "";
	if (!project.frontmatter.tags) {
		explaination += "No tags defined &#10;"
	}
    if (!project.frontmatter.tags.includes("projet")) {
        explaination += "No tags 'projet' defined &#10;"
    }
    if (!project.frontmatter.casquette) {
		explaination += "No casquette defined &#10;"
	}
    if (!project.frontmatter.parents) {
		explaination += "No parents defined &#10;"
	}
    if (!project.frontmatter.suivi) {
		explaination += "No suivi defined &#10;"
	}
	if (explaination) {
		project.containsErrors = true;
		project.errorExplaination = explaination;
		return;
	}
	project.containsErrors = false;
	return;
}

function preFormat(project) {
	listErrors(project);
	return project;
}

function format(project) {
    console.log(project.name);
    console.log(project.errorExplaination);
    return project;
}

function getBy(filter) {
	let pages = dv.pages('!"TEMPLATES" and #projet');
	let projects = pages.file
        .map(preFormat);
    if (filter) {
        projects = projects.filter(filter);
    }
    projects = projects.map(format);
	return projects.sort((project) => project.name, "desc");
}

function renderProjects() {
	let projects = getBy(input.filter);
	if (projects.length) {
		dv.list(projects.link);
	} else {
		dv.paragraph("🎉 Nothing to do ! 🎉");
	}
}

function listProjects() {

}