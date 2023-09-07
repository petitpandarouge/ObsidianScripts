
let _dv;

const priorityP0 = "P0";
const priorityP1 = "P1";

const creationDateRegex = /\[creation:: [^\]]+\]/g;
const dueDateRegex = /\[due:: [^\]]+\]/g;
const scheduledRegex = /\[scheduled:: [^\]]+\]/g;
const prioriteRegex = /\[priority:: [^\]]+\]/g;
const quickRegex = /\[quick:: true\]/g;
const endOfFirstLineRegex = /$/m;

function renderData(displayString, fieldKey, classNames, tooltip) {
	let span = `<span class="dataview inline-field">`;
	span += `<span class="dataview inline-field-standalone-value inherit-color `;
	if (classNames) {
		span += `${classNames}`;
	}
	span += `" `;
	if (fieldKey) {
		span += `data-dv-key="${fieldKey}" `;
	}
	if (tooltip) {
		span += `title="${tooltip}" `;
	}
	span += `>${displayString}</span></span>`;
	return span;
}

function dateToShortString(date) {
	return date.toFormat("dd-MM-yyyy");
}

function formatDueDate(task, visual, isDefaultDueDate) {
	if (task.due) {
		let displayString = "🎯 " + dateToShortString(task.due);
		let regexToReplace = dueDateRegex;
		let isDefaultClassNames = "";
		if (isDefaultDueDate) {
			displayString = "⚙️|" + displayString;
			regexToReplace = endOfFirstLineRegex;
			isDefaultClassNames = "default";
		}

		let oneWeek = _dv.duration("1 week");
		let dueDateMinusOneWeek = task.due.minus(oneWeek);
		if (task.due < _dv.date('today')) {
			return visual.replace(regexToReplace, 
				renderData(displayString, "due", "overdue"));
		} else if (task.due >= _dv.date('today') && _dv.date('today') >= dueDateMinusOneWeek) {
			return visual.replace(regexToReplace, 
				renderData(displayString, "due", "due-soon", "Due dans moins d'une semaine!"));
		} else if (dueDateMinusOneWeek > _dv.date('today')) {
			return visual.replace(regexToReplace,
				renderData(displayString, "due", isDefaultClassNames, "Due dans plus d'une semaine."));
		}
	}
	return visual;
}

function formatScheduledDate(task, visual) {
	if (task.scheduled) {
		let displayString = "📅 " + dateToShortString(task.scheduled);
		if (task.scheduled.ts == _dv.date('today').ts) {
			return visual.replace(scheduledRegex, 
				renderData(displayString, "scheduled", "today"));
		}
		if (task.scheduled < _dv.date('today')) {
			return visual.replace(scheduledRegex, 
				renderData(displayString, "scheduled", "missed"));
		}
		if (task.scheduled > _dv.date('today')) {
			return visual.replace(scheduledRegex,
				renderData(displayString, "scheduled"));
		}
	}
	return visual;
}

function formatLink(task, visual) {
	return visual.replace(endOfFirstLineRegex, 
		renderData(_dv.fileLink(task.path), "link"));
}

function format(task) {
	let isDefaultDueDate = tryDefineDefaultDueDate(task);
	let visual = task.text;
	visual = formatDueDate(task, visual, isDefaultDueDate);
	visual = formatScheduledDate(task, visual);
	visual = formatLink(task, visual);
	task.visual = visual;
	return task;
}

function tryDefineDefaultDueDate(task) {
	if (task.creation && !task.due) {
		let twoMonths = _dv.duration("2 months")
		task.due = task.creation.plus(twoMonths);
		return true;
	}
	return false;
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
