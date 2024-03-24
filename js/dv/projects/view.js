// INPUTS
let {order, sortBy} = input;
// Default values
order = order || 'asc';
sortBy = sortBy || 'lastModifiedDate';

// PROJECTS
let projects = dv.pages('!"TEMPLATES" and #projet')
	.where(p => !isArchived(p))
	.map(getMetadata);

// SORT
if (sortBy === "lastModifiedDate") {
	projects = projects.sort( project => {
		
		if (project.modified) {
			let lastModifiedDate = project.modified.toFormat("yyyy-MM-dd");
			return `${lastModifiedDate}`;
		}
		return "9999-99-99";
		
	}, order);
} else if (sortBy === "urgency") {
	projects = projects.sort( project => {
		return project.urgency;		
	}, order);
}

// RENDER
let html = `<section class="project-cards">`;

for (let i = 0; i < projects.length; i++) {

    const project = projects[i];
    
    html += `<article class="project-card">`;
    
		// Column.
		html += `<div class="flex-1">`;

			// TITLE
			let title = project.title || project.file.name;
			// Removing the date.
			title = title.replace(/(([\d|\ ]+[\-]) )/, "");
			html += `<h1 class="project-card-title"><a href="${project.file.name}" data-href="${project.file.name}" class="internal-link">${title}</a></h1>`;

			// SUBTITLE
			html += `<div class="project-card-meta">`;

    			if ( project.subtitle ) html += `<span class="project-card-subtitle">${project.subtitle}</span>`;

    		html += '</div>';

		html += `</div>`;

		// Column.
		html += `<div>`;

			html += `<div class="project-card-meta">`;

				// ERRORS
				if (project.containsErrors) {
					html += renderField("🐞", "error", null, project.errorExplaination);
				}

			html += `</div>`;

		html += `</div>`;

    // PARENTS
	// html += `<div class="project-card-meta">`;

	// let parentRegex = /\[\[(.+)\|(.+)\]\]/;
    // if ( project.parents && project.parents.length ) { for (let i = 0; i < project.parents.length; i++) {
	// 	let type = typeof(project.parents[i]);
	// 	debugger
	// 	let match = project.parents[i].match(parentRegex);
	// 	let parentLink = match[1];
	// 	let parentName = match[2];
    //     html += `<a class="project-card-link" href="${parentLink}">${parentName}</a>`;   
    // }}

    // html += '</div>';

		// Column.
		html += `<div class="project-card-meta">`;

			// DUE
			if (project.due) {
				let configuration = getConfiguration();
				let dueDate = project.due.toFormat("dd-MM-yyyy");
				let displayString = `🎯 ${dueDate}`;
				let today = dv.date('today');
				let dueDateMinusSoonDelai = project.due.minus(configuration.fields.due.soon.delai);
				if (project.due < today) {
					html += renderField(displayString, 
							configuration.fields.due.name, 
							configuration.fields.due.over.className);
				} else if (project.due >= today && today >= dueDateMinusSoonDelai) {
					html += renderField(displayString, 
							configuration.fields.due.name, 
							configuration.fields.due.soon.className, 
							configuration.fields.due.soon.tooltip);
				} else if (dueDateMinusSoonDelai > today) {
					html += renderField(displayString, 
							configuration.fields.due.name, 
							"", 
							configuration.fields.due.inAWhile.tooltip);
				}
				
				// let dueDate = project.due.toFormat("dd-MM-yyyy");
				// html += renderField(`🎯 ${dueDate}`, "due");
			}
		
		html += '</div>';

		// Column.
		html += `<div class="project-card-meta">`;

			// LAST MODIFICATION
			if (project.modified) {
				let lastModifiedDate = project.modified.toFormat("dd-MM-yyyy");
				html += renderField(`📝 ${lastModifiedDate}`, "last-modified");
			} else {
				let lastModifiedDate = project.file.mtime.toFormat("dd-MM-yyyy");
				html += renderField(`⚙️|📝 ${lastModifiedDate}`, "last-modified");
			}

			// LINKS
			// if ( project.links && project.links.length ) { for (let l = 0; l < project.links.length; l++) {
			//     let linkText = project.links[l].split(': ')[0];
			//     let linkURL  = project.links[l].split(': ')[1];
			//     html += `<a class="project-card-link" href="${linkURL}">${linkText}</a>`;   
			// }}

    	html += '</div>';

		// Column.
		html += `<div class="project-card-meta">`;

		let configuration = getConfiguration();
		let tooltip = `score : ${project.urgency}&#10;${project.urgencyExplaination}`; 
		html += renderField("🚨", configuration.fields.urgency.name, null, tooltip);

		html += '</div>';

    html += '</article>';

}

html += `</section>`;

return html;

// UTILS

function getConfiguration() {
	return {
		fields: {
			due: {
				name: "due",
				values: {
					default: {
						className: "default",
						delaiFromCreation: dv.duration("2 months")
					}
				},
				soon: {
					className: "due-soon",
					tooltip: "Due dans moins d'une semaine!",
					delai: dv.duration("1 week")
				},
				over: {
					className: "overdue"
				},
				inAWhile: {
					tooltip: "Due dans plus d'une semaine."
				}
			},
			urgency: {
				name: "urgency"
			},
			priority: {
				name: "priority",
				values: {
					highest: {
						value: "Highest",
					},
					high: {
						value: "High",
					},
					medium: {
						value: "Medium",
					},
					low: {
						value: "Low",
					},
					lowest: {
						value: "Lowest",
					},
					none: {
						value: "None"
					}
				}
			}
		}
	};
}

function getMetadata(project) {
	listErrors(project);
	definePriority(project);
	computeUrgency(project);
	return project;
}

function listErrors(project) {
	let explaination = "";
	if (!project.file.frontmatter.tags) {
		explaination += "No tags defined &#10;"
	} else if (!project.file.frontmatter.tags.includes("projet")) {
        explaination += "No tags 'projet' defined &#10;"
    }
    if (!project.file.frontmatter.casquette) {
		explaination += "No casquette defined &#10;"
	}
    if (!project.file.frontmatter.parents) {
		explaination += "No parents defined &#10;"
	}
    if (!project.file.frontmatter.suivi) {
		explaination += "No suivi defined &#10;"
	}
	if (!project.file.frontmatter.modified) {
		explaination += "No modified defined &#10;"
	}
	if (explaination) {
		project.containsErrors = true;
		project.errorExplaination = explaination;
		return;
	}
	project.containsErrors = false;
	return;
}

function renderField(displayString, fieldKey, classNames, tooltip) {
	let html = `<div class="dataview inline-field">`;
	html += `<span class="dataview inline-field-standalone-value inherit-color `;
	if (classNames) {
		html += `${classNames}`;
	}
	html += `" `;
	if (fieldKey) {
		html += `data-dv-key="${fieldKey}" `;
	}
	if (tooltip) {
		html += `title="${tooltip}" `;
	}
	html += `>${displayString}</span></div>`;
	return html;
}

function computeUrgency(task) {
	let score = 0;
	let explaination = "";
	let today = dv.date('today');
	let configuration = getConfiguration();

	if (!task.due) {
		explaination += "Not due : 0.0 &#10;";
		score += 0.0;
	} else if (today > task.due.plus(dv.duration("7 days"))) {
		explaination += "due more than 7 days ago : 12.0 &#10;";
		score += 12.0;
	} else if (today.ts === task.due.plus(dv.duration("7 days")).ts) {
		explaination += "due 7 days ago : 12.0 &#10;";
		score += 12.0;
	} else if (today.ts === task.due.plus(dv.duration("6 days")).ts) {
		explaination += "due 6 days ago : 11.54286 &#10;";
		score += 11.54286;
	} else if (today.ts === task.due.plus(dv.duration("5 days")).ts) {
		explaination += "due 5 days ago : 11.08571 &#10;";
		score += 11.08571;
	} else if (today.ts === task.due.plus(dv.duration("4 days")).ts) {
		explaination += "due 4 days ago : 10.62857 &#10;";
		score += 10.62857;
	} else if (today.ts === task.due.plus(dv.duration("3 days")).ts) {
		explaination += "due 3 days ago : 10.17143 &#10;";
		score += 10.17143;
	} else if (today.ts === task.due.plus(dv.duration("2 days")).ts) {
		explaination += "due 2 days ago : 9.71429 &#10;";
		score += 9.71429;
	} else if (today.ts === task.due.plus(dv.duration("1 days")).ts) {
		explaination += "due 1 days ago : 9.25714 &#10;";
		score += 9.25714;
	} else if (today.ts === task.due.ts) {
		explaination += "due today : 8.8 &#10;";
		score += 8.8;
	} else if (today.ts === task.due.minus(dv.duration("1 days")).ts) {
		explaination += "1 day until due : 8.34286 &#10;";
		score += 8.34286;
	} else if (today.ts === task.due.minus(dv.duration("2 days")).ts) {
		explaination += "2 days until due : 7.88571 &#10;";
		score += 7.88571;
	} else if (today.ts === task.due.minus(dv.duration("3 days")).ts) {
		explaination += "3 days until due : 7.42857 &#10;";
		score += 7.42857;
	} else if (today.ts === task.due.minus(dv.duration("4 days")).ts) {
		explaination += "4 days until due : 6.97143 &#10;";
		score += 6.97143;
	} else if (today.ts === task.due.minus(dv.duration("5 days")).ts) {
		explaination += "5 days until due : 6.51429 &#10;";
		score += 6.51429;
	} else if (today.ts === task.due.minus(dv.duration("6 days")).ts) {
		explaination += "6 days until due : 6.05714 &#10;";
		score += 6.05714;
	} else if (today.ts === task.due.minus(dv.duration("7 days")).ts) {
		explaination += "7 days until due : 5.6 &#10;";
		score += 5.6;
	} else if (today.ts === task.due.minus(dv.duration("8 days")).ts) {
		explaination += "8 days until due : 5.14286 &#10;";
		score += 5.14286;
	} else if (today.ts === task.due.minus(dv.duration("9 days")).ts) {
		explaination += "9 days until due : 4.68571 &#10;";
		score += 4.68571;
	} else if (today.ts === task.due.minus(dv.duration("10 days")).ts) {
		explaination += "10 days until due : 4.22857 &#10;";
		score += 4.22857;
	} else if (today.ts === task.due.minus(dv.duration("11 days")).ts) {
		explaination += "11 days until due : 3.77143 &#10;";
		score += 3.77143;
	} else if (today.ts === task.due.minus(dv.duration("12 days")).ts) {
		explaination += "12 days until due : 3.31429 &#10;";
		score += 3.31429;
	} else if (today.ts === task.due.minus(dv.duration("13 days")).ts) {
		explaination += "13 days until due : 2.85714 &#10;";
		score += 2.85714;
	} else if (today.ts === task.due.minus(dv.duration("14 days")).ts) {
		explaination += "14 days until due : 2.4 &#10;";
		score += 2.4;
	} else if (today < task.due.minus(dv.duration("14 days"))) {
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
	} else if (today <= task.scheduled.minus(dv.duration("1 days"))) {
		explaination += "Scheduled tomorrow or later : -3.0 &#10;";
		score += -3.0;
	} 

	let priorityScore = 0.0;
	if (task.priority === configuration.fields.priority.values.highest.value) {
		priorityScore = 9.0;
	} else if (task.priority === configuration.fields.priority.values.high.value) {
		priorityScore = 6.0;
	} else if (task.priority === configuration.fields.priority.values.medium.value) {
		priorityScore = 3.9;
	} else if (task.priority === configuration.fields.priority.values.none.value) {
		priorityScore = 1.95;
	} else if (task.priority === configuration.fields.priority.values.low.value) {
		priorityScore = 0.0;
	} else if (task.priority === configuration.fields.priority.values.lowest.value) {
		priorityScore = -1.8;
	}
	score += priorityScore;
	explaination += `Priority is '${task.priority}' : ${priorityScore}&#10;`;

	task.urgency = score;
	task.urgencyExplaination = explaination;
}

function definePriority(project) {
	let configuration = getConfiguration();
	project.priority = configuration.fields.priority.values.none.value;
}

function isArchived(project) {
	return project['note-type'] === "#archive";
}