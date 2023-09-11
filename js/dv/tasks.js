
let _dv;
let _options;
let _configuration;

function getConfiguration() {
	return {
		fields: {
			creation: {
				name: "creation",
				regex: /\[creation:: [^\]]+\]/
			},
			due: {
				name: "due",
				regex: /\[due:: [^\]]+\]/,
				values: {
					default: {
						className: "default",
						delaiFromCreation: _dv.duration("2 months")
					}
				},
				soon: {
					className: "due-soon",
					tooltip: "Due dans moins d'une semaine!",
					delai: _dv.duration("1 week")
				},
				over: {
					className: "overdue"
				},
				inAWhile: {
					tooltip: "Due dans plus d'une semaine."
				}
			},
			scheduled: {
				name: "scheduled",
				regex: /\[scheduled:: [^\]]+\]/,
				today: {
					className: "today"
				},
				missed: {
					className: "missed"
				}
			},
			quick: {
				name: "quick",
				regex: /\[quick:: true\]/
			},
			details: {
				name: "details",
				regex: /\(details:: [^\)]+\)/
			},
			person: {
				name: "person",
				regex: /\[person:: [^\]]+\]/
			},
			priority: {
				name: "priority",
				regex: /\[priority_[^:|\]]+:: true\]/,
				values: {
					highest: {
						value: "Highest",
						regex: /\[priority_highest:: true\]/
					},
					high: {
						value: "High",
						regex: /\[priority_high:: true\]/
					},
					medium: {
						value: "Medium",
						regex: /\[priority_medium:: true\]/
					},
					low: {
						value: "Low",
						regex: /\[priority_low:: true\]/
					},
					lowest: {
						value: "Lowest",
						regex: /\[priority_lowest:: true\]/
					},
					none: {
						value: "None"
					}
				}
			},
			link: {
				name: "link",
				regex: /$/m
			},
			urgency: {
				name: "urgency",
				regex: /$/m
			},
			error: {
				name: "error",
				regex: /$/m
			},
			all: {
				name: "all",
				regex: /\[[^:|\]]+:: [^\]]+\]/g
			}
		},
		endOfFirstLine: {
			regex: /$/m
		},
		string: {
			empty: ""
		}
	};	
}

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

function hideField(visual, fieldName) {
	return visual.replace(_configuration.fields[fieldName].regex, _configuration.string.empty); 
}

function formatDueDate(task, visual) {
	if (task.due) {
		if (_options && _options.visibleFields && !_options.visibleFields.includes(_configuration.fields.due.name)) {
			return hideField(visual, _configuration.fields.due.name)
		}

		let displayString = "🎯 " + dateToShortString(task.due);
		let regexToReplace = _configuration.fields.due.regex;
		let isDefaultClassNames = _configuration.string.empty;
		if (task.dueIsDefault) {
			displayString = "⚙️|" + displayString;
			regexToReplace = _configuration.endOfFirstLine.regex;
			isDefaultClassNames = _configuration.fields.due.values.default.className;
		}

		let today = _dv.date('today');
		let dueDateMinusSoonDelai = task.due.minus(_configuration.fields.due.soon.delai);
		if (task.due < today) {
			return visual.replace(regexToReplace, 
				renderData(displayString, 
					_configuration.fields.due.name, 
					_configuration.fields.due.over.className));
		} else if (task.due >= today && today >= dueDateMinusSoonDelai) {
			return visual.replace(regexToReplace, 
				renderData(displayString, 
					_configuration.fields.due.name, 
					_configuration.fields.due.soon.className, 
					_configuration.fields.due.soon.tooltip));
		} else if (dueDateMinusSoonDelai > today) {
			return visual.replace(regexToReplace,
				renderData(displayString, 
					_configuration.fields.due.name, 
					isDefaultClassNames, 
					_configuration.fields.due.inAWhile.tooltip));
		}
	}
	return visual;
}

function formatScheduledDate(task, visual) {
	if (task.scheduled) {
		if (_options && _options.visibleFields && !_options.visibleFields.includes(_configuration.fields.scheduled.name)) {
			return hideField(visual, _configuration.fields.scheduled.name)
		}

		let displayString = "📅 " + dateToShortString(task.scheduled);
		let today = _dv.date('today');
		if (task.scheduled.ts == today.ts) {
			return visual.replace(_configuration.fields.scheduled.regex, 
				renderData(displayString, 
					_configuration.fields.scheduled.name,
					_configuration.fields.scheduled.today.className));
		}
		if (task.scheduled < today) {
			return visual.replace(_configuration.fields.scheduled.regex,  
				renderData(displayString, 
					_configuration.fields.scheduled.name, 
					_configuration.fields.scheduled.missed.className));
		}
		if (task.scheduled > today) {
			return visual.replace(_configuration.fields.scheduled.regex, 
				renderData(displayString, 
					_configuration.fields.scheduled.name));
		}
	}
	return visual;
}

function formatCreationDate(visual) {
	if (_options && _options.visibleFields && !_options.visibleFields.includes(_configuration.fields.creation.name)) {
		return hideField(visual, _configuration.fields.creation.name);
	}
	return visual;
}

function formatDetails(visual) {
	if (_options && _options.visibleFields && !_options.visibleFields.includes(_configuration.fields.details.name)) {
		return hideField(visual, _configuration.fields.details.name);
	}
	return visual;
}

function formatQuick(visual) {
	if (_options && _options.visibleFields && !_options.visibleFields.includes(_configuration.fields.quick.name)) {
		return hideField(visual, _configuration.fields.quick.name);
	}
	return visual;
}

function formatPerson(visual) {
	if (_options && _options.visibleFields && !_options.visibleFields.includes(_configuration.fields.person.name)) {
		return hideField(visual, _configuration.fields.person.name);
	}
	return visual;
}

function formatLink(task, visual) {
	if (_options && _options.visibleFields && !_options.visibleFields.includes(_configuration.fields.link.name)) {
		return visual;
	}
	return visual.replace(_configuration.fields.link.regex, 
		renderData(_dv.fileLink(task.path), _configuration.fields.link.name));
}

function formatPriority(visual) {
	if (_options && _options.visibleFields && !_options.visibleFields.includes(_configuration.fields.priority.name)) {
		return hideField(visual, _configuration.fields.priority.name);
	}
	return visual;
}

function formatUrgency(task, visual) {
	if (_options && _options.visibleFields && !_options.visibleFields.includes(_configuration.fields.urgency.name)) {
		return visual;
	}
	let tooltip = `score : ${task.urgency}&#10;${task.urgencyExplaination}`; 
	return visual.replace(_configuration.fields.urgency.regex, 
		renderData("🚨", _configuration.fields.urgency.name, null, tooltip));
}

function listErrors(task) {
	let explaination = null;
	if (!task.creation) {
		explaination = "No creation date defined &#10;"
	}
	if (explaination) {
		task.containsErrors = true;
		task.errorExplaination = explaination;
		return true;
	}
	task.containsErrors = false;
	return false;
}

function formatError(task, visual) {
	if (_options && _options.visibleFields && !_options.visibleFields.includes(_configuration.fields.error.name)) {
		return visual;
	}
	return visual.replace(_configuration.fields.error.regex, 
		renderData("🐞", _configuration.fields.error.name, null, task.errorExplaination));
}

function tryDefineDefaultDueDate(task) {
	if (!task.due) {
		task.due = task.creation.plus(_configuration.fields.due.values.default.delaiFromCreation);
		task.dueIsDefault = true;
	} else {
		task.dueIsDefault = false;
	}
}

function definePriority(task) {
	if (_configuration.fields.priority.values.highest.regex.test(task.text)) {
		task.priority = _configuration.fields.priority.values.highest.value;
	} else if (_configuration.fields.priority.values.high.regex.test(task.text)) {
		task.priority = _configuration.fields.priority.values.high.value;
	} else if (_configuration.fields.priority.values.medium.regex.test(task.text)) {
		task.priority = _configuration.fields.priority.values.medium.value;
	} else if (_configuration.fields.priority.values.low.regex.test(task.text)) {
		task.priority = _configuration.fields.priority.values.low.value;
	} else if (_configuration.fields.priority.values.lowest.regex.test(task.text)) {
		task.priority = _configuration.fields.priority.values.lowest.value;
	} else {
		task.priority = _configuration.fields.priority.values.none.value;
	}
}

function computeUrgency(task) {
	let score = 0;
	let explaination = "";
	let today = _dv.date('today');

	if (today > task.due.plus(_dv.duration("7 days"))) {
		explaination += "due more than 7 days ago : 12.0 &#10;";
		score += 12.0;
	} else if (today.ts === task.due.plus(_dv.duration("7 days")).ts) {
		explaination += "due 7 days ago : 12.0 &#10;";
		score += 12.0;
	} else if (today.ts === task.due.plus(_dv.duration("6 days")).ts) {
		explaination += "due 6 days ago : 11.54286 &#10;";
		score += 11.54286;
	} else if (today.ts === task.due.plus(_dv.duration("5 days")).ts) {
		explaination += "due 5 days ago : 11.08571 &#10;";
		score += 11.08571;
	} else if (today.ts === task.due.plus(_dv.duration("4 days")).ts) {
		explaination += "due 4 days ago : 10.62857 &#10;";
		score += 10.62857;
	} else if (today.ts === task.due.plus(_dv.duration("3 days")).ts) {
		explaination += "due 3 days ago : 10.17143 &#10;";
		score += 10.17143;
	} else if (today.ts === task.due.plus(_dv.duration("2 days")).ts) {
		explaination += "due 2 days ago : 9.71429 &#10;";
		score += 9.71429;
	} else if (today.ts === task.due.plus(_dv.duration("1 days")).ts) {
		explaination += "due 1 days ago : 9.25714 &#10;";
		score += 9.25714;
	} else if (today.ts === task.due.ts) {
		explaination += "due today : 8.8 &#10;";
		score += 8.8;
	} else if (today.ts === task.due.minus(_dv.duration("1 days")).ts) {
		explaination += "1 day until due : 8.34286 &#10;";
		score += 8.34286;
	} else if (today.ts === task.due.minus(_dv.duration("2 days")).ts) {
		explaination += "2 days until due : 7.88571 &#10;";
		score += 7.88571;
	} else if (today.ts === task.due.minus(_dv.duration("3 days")).ts) {
		explaination += "3 days until due : 7.42857 &#10;";
		score += 7.42857;
	} else if (today.ts === task.due.minus(_dv.duration("4 days")).ts) {
		explaination += "4 days until due : 6.97143 &#10;";
		score += 6.97143;
	} else if (today.ts === task.due.minus(_dv.duration("5 days")).ts) {
		explaination += "5 days until due : 6.51429 &#10;";
		score += 6.51429;
	} else if (today.ts === task.due.minus(_dv.duration("6 days")).ts) {
		explaination += "6 days until due : 6.05714 &#10;";
		score += 6.05714;
	} else if (today.ts === task.due.minus(_dv.duration("7 days")).ts) {
		explaination += "7 days until due : 5.6 &#10;";
		score += 5.6;
	} else if (today.ts === task.due.minus(_dv.duration("8 days")).ts) {
		explaination += "8 days until due : 5.14286 &#10;";
		score += 5.14286;
	} else if (today.ts === task.due.minus(_dv.duration("9 days")).ts) {
		explaination += "9 days until due : 4.68571 &#10;";
		score += 4.68571;
	} else if (today.ts === task.due.minus(_dv.duration("10 days")).ts) {
		explaination += "10 days until due : 4.22857 &#10;";
		score += 4.22857;
	} else if (today.ts === task.due.minus(_dv.duration("11 days")).ts) {
		explaination += "11 days until due : 3.77143 &#10;";
		score += 3.77143;
	} else if (today.ts === task.due.minus(_dv.duration("12 days")).ts) {
		explaination += "12 days until due : 3.31429 &#10;";
		score += 3.31429;
	} else if (today.ts === task.due.minus(_dv.duration("13 days")).ts) {
		explaination += "13 days until due : 2.85714 &#10;";
		score += 2.85714;
	} else if (today.ts === task.due.minus(_dv.duration("14 days")).ts) {
		explaination += "14 days until due : 2.4 &#10;";
		score += 2.4;
	} else if (today < task.due.minus(_dv.duration("14 days"))) {
		explaination += "More than 14 days until due : 2.4 &#10;";
		score += 2.4;
	}

	if (task.dueIsDefault) {
		explaination += "due by default : -1.0 &#10;";
		score += -1.0;
	}

	if (!task.scheduled) {
		explaination += "Not scheduled : 0.0 &#10;";
		score += 0.0;
	} else if (today >= task.scheduled) {
		explaination += "Scheduled today or earlier : 5.0 &#10;";
		score += 5.0;
	} else if (today <= task.scheduled.minus(_dv.duration("1 days"))) {
		explaination += "Scheduled tomorrow or later : -3.0 &#10;";
		score += -3.0;
	} 

	let priorityScore = 0.0;
	if (task.priority === _configuration.fields.priority.values.highest.value) {
		priorityScore = 9.0;
	} else if (task.priority === _configuration.fields.priority.values.high.value) {
		priorityScore = 6.0;
	} else if (task.priority === _configuration.fields.priority.values.medium.value) {
		priorityScore = 3.9;
	} else if (task.priority === _configuration.fields.priority.values.none.value) {
		priorityScore = 1.95;
	} else if (task.priority === _configuration.fields.priority.values.low.value) {
		priorityScore = 0.0;
	} else if (task.priority === _configuration.fields.priority.values.lowest.value) {
		priorityScore = -1.8;
	}
	score += priorityScore;
	explaination += `Priority is '${task.priority}' : ${priorityScore}&#10;`;

	task.urgency = score;
	task.urgencyExplaination = explaination;
}

function preFormat(task) {
	definePriority(task);
	listErrors(task);
	return task;
}

function format(task) {
	if (task.containsErrors) {
		
		let visual = task.text;
		visual = hideField(visual, _configuration.fields.all.name);
		visual = formatError(task, visual);
		task.visual = visual;

		return task;
	}

	tryDefineDefaultDueDate(task);
	computeUrgency(task);

	let visual = task.text;
	visual = formatCreationDate(visual);
	visual = formatDetails(visual);
	visual = formatQuick(visual);
	visual = formatPriority(visual);
	visual = formatPerson(visual);
	visual = formatDueDate(task, visual);
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
	let tasks = pages.file.tasks
		.map(preFormat)
		.filter(filter)
		.map(format);
	if (_options && _options.sortBy === _configuration.fields.due.name) {
		return tasks.sort((task) => task.due, "asc", sortDate);
	}
	return tasks.sort((task) => task.urgency, "desc");
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
	init: function (dv, options) {
		_dv = dv;
		_options = options;
		_configuration = getConfiguration();
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
	renderTasksByPriority: function (priority) {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.priority == priority;
		})
	},
	renderQuickTasks: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.quick;
		})
	},
	renderTasksInError: function () {
		renderTasks(function (task) {
			return !task.fullyCompleted && task.containsErrors;
		})
	}
};
