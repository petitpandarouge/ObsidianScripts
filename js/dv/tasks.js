
let _dv;

const priorityHighest = "Highest";
const priorityHigh = "High";
const priorityMedium = "Medium";
const priorityNone = "None";
const priorityLow = "Low";
const priorityLowest = "Lowest";

const creationDateRegex = /\[creation:: [^\]]+\]/g;
const dueDateRegex = /\[due:: [^\]]+\]/g;
const scheduledRegex = /\[scheduled:: [^\]]+\]/g;
const quickRegex = /\[quick:: true\]/g;
const priorityHighestRegex = /\[priority_highest:: true\]/g;
const priorityHighRegex = /\[priority_high:: true\]/g;
const priorityMediumRegex = /\[priority_medium:: true\]/g;
const priorityLowRegex = /\[priority_low:: true\]/g;
const priorityLowestRegex = /\[priority_Lowest:: true\]/g;
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
	definePriority(task);

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

function definePriority(task) {
	if (priorityHighestRegex.test(task.text)) {
		task.priority = priorityHighest;
	} else if (priorityHighRegex.test(task.text)) {
		task.priority = priorityHigh;
	} else if (priorityMediumRegex.test(task.text)) {
		task.priority = priorityMedium;
	} else if (priorityLowRegex.test(task.text)) {
		task.priority = priorityLow;
	} else if (priorityLowestRegex.test(task.text)) {
		task.priority = priorityLowest;
	} else {
		task.priority = priorityNone;
	}
	console.log(task.priority);
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
		.map(format)
		.filter(filter)
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
	renderHighestPriorityTasks: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.priority == priorityHighest;
		})
	},
	renderHighPriorityTasks: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.priority == priorityHigh;
		})
	},
	renderQuickTasks: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.quick;
		})
	}
};
