
function get() {
	let pages = _dv.pages('!"TEMPLATES" and #projet');
	let projects = pages.file
	return projects.sort((project) => project.name, "desc");
}

function renderProjects() {
	let projects = get();
	if (projects.length) {
		_dv.list(projects.link);
	} else {
		_dv.paragraph("🎉 Nothing to do ! 🎉");
	}
}

module.exports = {
	init: function (dv) {
		_dv = dv;
	},
    renderProjects: renderProjects
};