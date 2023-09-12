let projects = dv.pages('!"TEMPLATES" and #projet')
	.map(getMetadata);
let order    = input.order || 'asc';

// SORT
projects = projects.sort( project => {
    
	let lastModifiedDate = project.file.mtime.toFormat("yyyy-MM-dd");
    return `${lastModifiedDate}`;
    
}, order);

// RENDER
let html = `<section class="project-cards">`;

for (let i = 0; i < projects.length; i++) {

    const project = projects[i];

    // Jump ahead to get the most relevant date.
    let now = moment();

    if ( project.status == 'todo' && project.dates && Object.keys(project.dates).length ) {
        projectTimestamp = Object.keys(project.dates)[0];
        let projectDate  = moment( projectTimestamp );

        if ( projectDate.format('YYYY MM DD') == now.format('YYYY MM DD') || projectDate.unix() <= now.unix() ) {
            project.status = 'today';
        }
    }
    
    html += `<article class="project-card">`;
        
    // ICON
    if ( project.status ) html += `<span class="project-card-status" data-status="${project.status}">&nbsp;</span>`;

    // TITLE
    let title = project.title || project.file.name;
	// Removing the date.
	title = title.replace(/(([\d|\ |\-]+) )/, "");
    html += `<h1 class="project-card-title"><a href="${project.file.name}" data-href="${project.file.name}" class="internal-link">${title}</a></h1>`;

    // SUBTITLE
    html += `<div class="project-card-meta">`;

    if ( project.subtitle ) html += `<span class="project-card-subtitle">${project.subtitle}</span>`;

    html += '</div>';

    // DATES
    if ( project.dates && Object.keys(project.dates).length ) { for (let l = 0; l < Object.keys(project.dates).length; l++) {
        const itemTimestamp = Object.keys(project.dates)[l];
        const itemText      = project.dates[ itemTimestamp ];

        let itemDate        = moment( itemTimestamp );
        let itemHasTime     = ( itemTimestamp.split(' ').length > 1 );

        
        let sameYear        = ( now.format('YYYY') == itemDate.format('YYYY') );

        let displayDate     = itemDate.calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: ( sameYear ? 'D MMMM' : 'D MMMM YYYY' ),
        });

        if ( itemHasTime ) {
            displayDate += ' <span class="project-card-sep">•</span> ' + itemDate.format( 'h:mm a' );
        }

        html += `<div class="project-card-date">
            <span class="project-card-date-prefix" title="${itemDate}">${displayDate}</span>
            <span class="project-card-date-text" title="${itemDate}">${itemText}</span>
        </div>`;
            
    }}

	// LAST MODIFICATION
	let lastModifiedDate = project.file.mtime.toFormat("dd-MM-yyyy");
	html += renderData(`📝 ${lastModifiedDate}`, "last-modified");

	// ERRORS
	if (project.containsErrors) {
		html += renderData("🐞", "error", null, project.errorExplaination);
	}

    // LINKS
    html += `<div class="project-card-meta">`;

    if ( project.links && project.links.length ) { for (let l = 0; l < project.links.length; l++) {
        let linkText = project.links[l].split(': ')[0];
        let linkURL  = project.links[l].split(': ')[1];
        html += `<a class="project-card-link" href="${linkURL}">${linkText}</a>`;
            
    }}

    html += '</div>';

    html += '</div>';

    html += '</article>';

}

html += `</section>`;

return html;

// UTILS

function getMetadata(project) {
	listErrors(project);
	return project;
}

function listErrors(project) {
	let explaination = "";
	if (!project.file.frontmatter.tags) {
		explaination += "No tags defined &#10;"
	}
    if (!project.file.frontmatter.tags.includes("projet")) {
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
	if (explaination) {
		project.containsErrors = true;
		project.errorExplaination = explaination;
		return;
	}
	project.containsErrors = false;
	return;
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