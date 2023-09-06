
let _dv;

const priorityP0 = "P0";
const priorityP1 = "P1";

const creationDateRegex = /\[creation:: [^\]]+\]/g;
const dueDateRegex = /\[due:: [^\]]+\]/g;
const prioriteRegex = /\[priority:: [^\]]+\]/g;
const quickRegex = /\[quick:: true\]/g;
const endOfFirstLineRegex = /$/m;

const green = "rgba(0, 132, 98, 0.7)";
const red = "rgba(211, 60, 43, 0.7)";
const lightGrey = "rgba(202, 211, 224, 0.7)";
const darkGrey = "rgba(30, 30, 30, 0.7)";
const lightBlue = "rgba(101, 163, 252, 0.7)";
const darkBlue = "rgba(17, 24, 92, 0.7)";
const normal = "var(--text-muted)";

function renderData(backgroundColor, textColor, displayString) {
	let span = `<span class="task-tag" style="border-radius:5px; padding:3px; `;
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
	return date.toFormat("dd-MM-yyyy");
}

function formatDueDate(task) {
	if (task.due) {
		if (task.due.ts == _dv.date('today').ts) {
			return task.text.replace(dueDateRegex, 
				renderData(green, null, "🎯 " + dateToShortString(task.due)));
		}
		if (task.due < _dv.date('today')) {
			return task.text.replace(dueDateRegex, 
				renderData(red, null, "🎯 " + dateToShortString(task.due)));
		}
		if (task.due > _dv.date('today')) {
			return task.text.replace(dueDateRegex,
				renderData(lightGrey, darkGrey, "🎯 " + dateToShortString(task.due)));
		}
	}
	return task.text;
}

function formatLink(task, visual) {
	return visual.replace(endOfFirstLineRegex, 
		renderData(darkBlue, lightBlue, _dv.fileLink(task.path)));
}

function format(task) {
	let visual = formatDueDate(task);
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
	renderTasks: renderTasks,
	renderActiveTasks: function (projectFilePath) {
		renderTasks(function (task) {
			if (projectFilePath) {
				return !task.fullyCompleted && task.path == projectFilePath;
			}
			return !task.fullyCompleted;
		})
	},
	renderTasksByStatus: function (status) {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.status == status;
		})
	},
	renderP0Tasks: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.priority == priorityP0;
		})
	},
	renderP1Tasks: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.priority == priorityP1;
		})
	},
	renderQuickTasks: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.quick;
		})
	}
};
