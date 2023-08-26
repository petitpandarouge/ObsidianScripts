
let _dv;

const dueDateRegex = /\[due:: [^\]]+\]/g;
const detailledStatusRegex = /\[detailledStatus:: [^\]]+\]/g;
const prioriteRegex = /\[priorité:: [^\]]+\]/g;
const endOfFirstLineRegex = /$/m;

const green = "rgba(0, 132, 98, 0.7)";
const red = "rgba(211, 60, 43, 0.7)";
const grey = "rgba(108, 122, 137, 0.7)";
const velvet = "rgba(46, 41, 58, 0.7)";
const normal = "var(--text-muted)";

const enCoursDetailedStatus = "en cours";
const prioriteP0 = "P0";
const prioriteP1 = "P1";

function renderData(backgroundColor, textColor, displayString) {
	let span = `<span style= "border-radius:5px; padding:2px 5px; `;
	span += `font-size:8pt; margin:3px; `;
	if (backgroundColor !== null) {
		span += `background-color:${backgroundColor}; `;
	}
	if (textColor !== null) {
		span += `color:${normal}; `;
	}
	span += `">${displayString}</span>`;
	return span;
}

function dueDateToShortString(task) {
	return task.due.toFormat("yyyy-MM-dd");
}

function formatDueDate(task) {
	if (task.due) {
		if (task.due.ts == _dv.date('today').ts) {
			return task.text.replace(dueDateRegex, 
				renderData(green, null, dueDateToShortString(task)));
		}
		if (task.due < _dv.date('today')) {
			return task.text.replace(dueDateRegex, 
				renderData(red, null, dueDateToShortString(task)));
		}
		if (task.due > _dv.date('today')) {
			return task.text.replace(dueDateRegex,
				renderData(grey, normal, dueDateToShortString(task)));
		}
	}
	return task.text;
}

function formatPriorite(task, visual) {
	return visual.replace(prioriteRegex, "");
}

function formatDetailledStatus(task, visual) {
	return visual.replace(detailledStatusRegex, "");
}

function formatLink(task, visual) {
	return visual.replace(endOfFirstLineRegex, 
		renderData(velvet, null, _dv.fileLink(task.path)));
}

function format(task) {
	let visual = formatDueDate(task);
	visual = formatPriorite(task, visual);
	visual = formatDetailledStatus(task, visual);
	visual = formatLink(task, visual);
	task.visual = visual;
	return task;
}

function sortDate(date1, date2) 
{ 
	if (date1 !== undefined && date2 === undefined) {
		return -1;
	}
	if (date1 === undefined && date2 !== undefined) {
		return 1;
	}
	if (date1 < date2) { 
		return -1; 
	} 
	if (date1 > date2) { 
		return 1; 
	} 
	return 0; 
}

function getBy(filter) {
	let pages = _dv.pages('!"07 TEMPLATES"');
	return (
		pages.file.tasks
		.filter(filter)
		.map(format)
		.sort((task) => task.due, "asc", sortDate)
	);
}

function renderTasks(filter) {
	let tasks = getBy(filter);
	if (tasks.length) {
		_dv.taskList(tasks, false);
	} else {
		_dv.paragraph("🎉 Nothing to do ! 🎉");
	}
}

module.exports = {
	init: function (dv) {
		_dv = dv;
	},
	renderTasksEnCours: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.detailledStatus == enCoursDetailedStatus;
		})
	},
	renderTasksP0: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.priorité == prioriteP0;
		})
	},
	renderTasksP1: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.priorité == prioriteP1;
		})
	}
};
