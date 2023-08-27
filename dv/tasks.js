
let _dv;

const enCoursDetailedStatus = "en cours";
const priorityP0 = "P0";
const priorityP1 = "P1";

const creationDateRegex = /\[creation:: [^\]]+\]/g;
const dueDateRegex = /\[due:: [^\]]+\]/g;
const detailledStatusRegex = /\[detailledStatus:: [^\]]+\]/g;
const prioriteRegex = /\[priority:: [^\]]+\]/g;
const endOfFirstLineRegex = /$/m;

const green = "rgba(0, 132, 98, 0.7)";
const red = "rgba(211, 60, 43, 0.7)";
const grey = "rgba(108, 122, 137, 0.7)";
const lightGrey = "rgba(202, 211, 224, 0.7)";
const darkGrey = "rgba(38, 38, 38, 0.7)";
const velvet = "rgba(46, 41, 58, 0.7)";
const lightBlue = "rgba(101, 163, 252, 0.7)";
const yellow = "rgba(59, 117, 46, 0.7)";
const normal = "var(--text-muted)";

function renderData(backgroundColor, textColor, displayString) {
	let span = `<span style="border-radius:5px; padding:2px 5px; `;
	span += `font-size:8pt; margin:3px; `;
	if (backgroundColor !== null) {
		span += `background-color:${backgroundColor}; `;
	}
	if (textColor !== null) {
		span += `color:${textColor}; `;
	}
	span += `">${displayString}</span>`;
	return span;
}

function dateToShortString(date) {
	return date.toFormat("yyyy-MM-dd");
}

function formatDueDate(task) {
	if (task.due) {
		if (task.due.ts == _dv.date('today').ts) {
			return task.text.replace(dueDateRegex, 
				renderData(green, null, dateToShortString(task.due)));
		}
		if (task.due < _dv.date('today')) {
			return task.text.replace(dueDateRegex, 
				renderData(red, null, dateToShortString(task.due)));
		}
		if (task.due > _dv.date('today')) {
			return task.text.replace(dueDateRegex,
				renderData(lightGrey, darkGrey, dateToShortString(task.due)));
		}
	}
	return task.text;
}

function formatCreationDate(task, visual) {
	if (task.creation) {
		return visual.replace(creationDateRegex,
			renderData(grey, normal, "🌱 " + dateToShortString(task.creation)));
	}
	return visual;
}

function formatPriorite(task, visual) {
	return visual.replace(prioriteRegex, "");
}

function formatDetailledStatus(task, visual) {
	return visual.replace(detailledStatusRegex, "");
}

function formatLink(task, visual) {
	return visual.replace(endOfFirstLineRegex, 
		renderData(lightBlue, null, _dv.fileLink(task.path)));
}

function format(task) {
	let visual = formatDueDate(task);
	visual = formatPriorite(task, visual);
	visual = formatDetailledStatus(task, visual);
	visual = formatLink(task, visual);
	visual = formatCreationDate(task, visual);
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
	renderTasksActive: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted;
		})
	},
	renderTasksEnCours: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.detailledStatus == enCoursDetailedStatus;
		})
	},
	renderTasksP0: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.priorité == priorityP0;
		})
	},
	renderTasksP1: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.priorité == priorityP1;
		})
	}
};
