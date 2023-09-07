
let _dv;

const priorityHighest = "Highest";
const priorityHigh = "High";
const priorityMedium = "Medium";
const priorityNone = "None";
const priorityLow = "Low";
const priorityLowest = "Lowest";

const creationDateRegex = /\[creation:: [^\]]+\]/;
const dueDateRegex = /\[due:: [^\]]+\]/;
const scheduledRegex = /\[scheduled:: [^\]]+\]/;
const quickRegex = /\[quick:: true\]/;
const priorityHighestRegex = /\[priority_highest:: true\]/;
const priorityHighRegex = /\[priority_high:: true\]/;
const priorityMediumRegex = /\[priority_medium:: true\]/;
const priorityLowRegex = /\[priority_low:: true\]/;
const priorityLowestRegex = /\[priority_Lowest:: true\]/;
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

function tryDefineDefaultDueDate(task) {
	if (!task.due) {
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
}

function computeUrgency(task) {
	let score = 0;
	let explaination = "";
	let today = _dv.date('today');

	if (today > task.due.plus(_dv.duration("7 days"))) {
		explaination += "due more than 7 days ago&#10;";
		score += 12.0;
	} else if (today.ts === task.due.plus(_dv.duration("7 days")).ts) {
		explaination += "due 7 days ago&#10;";
		score += 12.0;
	} else if (today.ts === task.due.plus(_dv.duration("6 days")).ts) {
		explaination += "due 6 days ago&#10;";
		score += 11.54286;
	} else if (today.ts === task.due.plus(_dv.duration("5 days")).ts) {
		explaination += "due 5 days ago&#10;";
		score += 11.08571;
	} else if (today.ts === task.due.plus(_dv.duration("4 days")).ts) {
		explaination += "due 4 days ago&#10;";
		score += 10.62857;
	} else if (today.ts === task.due.plus(_dv.duration("3 days")).ts) {
		explaination += "due 3 days ago&#10;";
		score += 10.17143;
	} else if (today.ts === task.due.plus(_dv.duration("2 days")).ts) {
		explaination += "due 2 days ago&#10;";
		score += 9.71429;
	} else if (today.ts === task.due.plus(_dv.duration("1 days")).ts) {
		explaination += "due 1 days ago&#10;";
		score += 9.25714;
	} else if (today.ts === task.due.ts) {
		explaination += "due today&#10;";
		score += 8.80000;
	} else if (today.ts === task.due.minus(_dv.duration("1 days")).ts) {
		explaination += "1 day until due&#10;";
		score += 8.34286;
	} else if (today.ts === task.due.minus(_dv.duration("2 days")).ts) {
		explaination += "2 days until due&#10;";
		score += 7.88571;
	} else if (today.ts === task.due.minus(_dv.duration("3 days")).ts) {
		explaination += "3 days until due&#10;";
		score += 7.42857;
	} else if (today.ts === task.due.minus(_dv.duration("4 days")).ts) {
		explaination += "4 days until due&#10;";
		score += 6.97143;
	} else if (today.ts === task.due.minus(_dv.duration("5 days")).ts) {
		explaination += "5 days until due&#10;";
		score += 6.51429;
	} else if (today.ts === task.due.minus(_dv.duration("6 days")).ts) {
		explaination += "6 days until due&#10;";
		score += 6.05714;
	} else if (today.ts === task.due.minus(_dv.duration("7 days")).ts) {
		explaination += "7 days until due&#10;";
		score += 5.60000;
	} else if (today.ts === task.due.minus(_dv.duration("8 days")).ts) {
		explaination += "8 days until due&#10;";
		score += 5.14286;
	} else if (today.ts === task.due.minus(_dv.duration("9 days")).ts) {
		explaination += "9 days until due&#10;";
		score += 4.68571;
	} else if (today.ts === task.due.minus(_dv.duration("10 days")).ts) {
		explaination += "10 days until due&#10;";
		score += 4.22857;
	} else if (today.ts === task.due.minus(_dv.duration("11 days")).ts) {
		explaination += "11 days until due&#10;";
		score += 3.77143;
	} else if (today.ts === task.due.minus(_dv.duration("12 days")).ts) {
		explaination += "12 days until due&#10;";
		score += 3.31429;
	} else if (today.ts === task.due.minus(_dv.duration("13 days")).ts) {
		explaination += "13 days until due&#10;";
		score += 2.85714;
	} else if (today.ts === task.due.minus(_dv.duration("14 days")).ts) {
		explaination += "14 days until due&#10;";
		score += 2.4;
	} else if (today < task.due.minus(_dv.duration("14 days"))) {
		explaination += "More than 14 days until due&#10;";
		score += 2.4;
	}

	if (!task.scheduled) {
		explaination += "Not scheduled&#10;";
		score += 0.0;
	} else if (today >= task.scheduled) {
		explaination += "Scheduled today or earlier&#10;";
		score += 5.0;
	} else if (today <= task.scheduled.minus(_dv.duration("1 days"))) {
		explaination += "Scheduled tomorrow or later&#10;";
		score += -3.0;
	} 

	explaination += `Priority is '${task.priority}'&#10;`;
	if (task.priority === priorityHighest) {
		score += 9.0;
	} else if (task.priority === priorityHigh) {
		score += 6.0;
	} else if (task.priority === priorityMedium) {
		score += 3.9;
	} else if (task.priority === priorityNone) {
		score += 1.95;
	} else if (task.priority === priorityLow) {
		score += 0.0;
	} else if (task.priority === priorityLowest) {
		score += -1.8;
	}

	task.urgency = score;
	task.urgencyExplaination = explaination;
}

function formatUrgency(task, visual) {
	let tooltip = `score : ${task.urgency}&#10;${task.urgencyExplaination}`; 
	return visual.replace(endOfFirstLineRegex, 
		renderData("🚨", "urgency", null, tooltip));
}

function containsErrors(task) {
	if (!task.creation) {
		return true;
	}
	return false;
}

function preFormat(task) {
	definePriority(task);
	return task;
}

function format(task) {
	if (containsErrors(task)) {
		return task;
	}

	let isDefaultDueDate = tryDefineDefaultDueDate(task);
	computeUrgency(task);

	let visual = task.text;
	visual = formatDueDate(task, visual, isDefaultDueDate);
	visual = formatScheduledDate(task, visual);
	visual = formatUrgency(task, visual);
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
		.map(preFormat)
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
