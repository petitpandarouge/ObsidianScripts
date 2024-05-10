namespace Obsidian {
	export class Urgency {
        #dv: IDataview;
        #conf: ITodoConfiguration;

        constructor(dv: IDataview, conf: ITodoConfiguration) {
            this.#dv = dv
            this.#conf = conf;
        }
        
        compute() {

        }
        getScore(): number {
            return 12;
        }
        getExplaination(): string {
            return '';
        }
    }
    
    export interface IUrgencyable {
        getUrgency(): Urgency;
    }
}

// export function computeUrgency(task) {
// 	let score = 0;
// 	let explaination = "";
// 	let today = _dv.date('today');

// 	if (today > task.due.plus(_dv.duration("7 days"))) {
// 		explaination += "due more than 7 days ago : 12.0 &#10;";
// 		score += 12.0;
// 	} else if (today.ts === task.due.plus(_dv.duration("7 days")).ts) {
// 		explaination += "due 7 days ago : 12.0 &#10;";
// 		score += 12.0;
// 	} else if (today.ts === task.due.plus(_dv.duration("6 days")).ts) {
// 		explaination += "due 6 days ago : 11.54286 &#10;";
// 		score += 11.54286;
// 	} else if (today.ts === task.due.plus(_dv.duration("5 days")).ts) {
// 		explaination += "due 5 days ago : 11.08571 &#10;";
// 		score += 11.08571;
// 	} else if (today.ts === task.due.plus(_dv.duration("4 days")).ts) {
// 		explaination += "due 4 days ago : 10.62857 &#10;";
// 		score += 10.62857;
// 	} else if (today.ts === task.due.plus(_dv.duration("3 days")).ts) {
// 		explaination += "due 3 days ago : 10.17143 &#10;";
// 		score += 10.17143;
// 	} else if (today.ts === task.due.plus(_dv.duration("2 days")).ts) {
// 		explaination += "due 2 days ago : 9.71429 &#10;";
// 		score += 9.71429;
// 	} else if (today.ts === task.due.plus(_dv.duration("1 days")).ts) {
// 		explaination += "due 1 days ago : 9.25714 &#10;";
// 		score += 9.25714;
// 	} else if (today.ts === task.due.ts) {
// 		explaination += "due today : 8.8 &#10;";
// 		score += 8.8;
// 	} else if (today.ts === task.due.minus(_dv.duration("1 days")).ts) {
// 		explaination += "1 day until due : 8.34286 &#10;";
// 		score += 8.34286;
// 	} else if (today.ts === task.due.minus(_dv.duration("2 days")).ts) {
// 		explaination += "2 days until due : 7.88571 &#10;";
// 		score += 7.88571;
// 	} else if (today.ts === task.due.minus(_dv.duration("3 days")).ts) {
// 		explaination += "3 days until due : 7.42857 &#10;";
// 		score += 7.42857;
// 	} else if (today.ts === task.due.minus(_dv.duration("4 days")).ts) {
// 		explaination += "4 days until due : 6.97143 &#10;";
// 		score += 6.97143;
// 	} else if (today.ts === task.due.minus(_dv.duration("5 days")).ts) {
// 		explaination += "5 days until due : 6.51429 &#10;";
// 		score += 6.51429;
// 	} else if (today.ts === task.due.minus(_dv.duration("6 days")).ts) {
// 		explaination += "6 days until due : 6.05714 &#10;";
// 		score += 6.05714;
// 	} else if (today.ts === task.due.minus(_dv.duration("7 days")).ts) {
// 		explaination += "7 days until due : 5.6 &#10;";
// 		score += 5.6;
// 	} else if (today.ts === task.due.minus(_dv.duration("8 days")).ts) {
// 		explaination += "8 days until due : 5.14286 &#10;";
// 		score += 5.14286;
// 	} else if (today.ts === task.due.minus(_dv.duration("9 days")).ts) {
// 		explaination += "9 days until due : 4.68571 &#10;";
// 		score += 4.68571;
// 	} else if (today.ts === task.due.minus(_dv.duration("10 days")).ts) {
// 		explaination += "10 days until due : 4.22857 &#10;";
// 		score += 4.22857;
// 	} else if (today.ts === task.due.minus(_dv.duration("11 days")).ts) {
// 		explaination += "11 days until due : 3.77143 &#10;";
// 		score += 3.77143;
// 	} else if (today.ts === task.due.minus(_dv.duration("12 days")).ts) {
// 		explaination += "12 days until due : 3.31429 &#10;";
// 		score += 3.31429;
// 	} else if (today.ts === task.due.minus(_dv.duration("13 days")).ts) {
// 		explaination += "13 days until due : 2.85714 &#10;";
// 		score += 2.85714;
// 	} else if (today.ts === task.due.minus(_dv.duration("14 days")).ts) {
// 		explaination += "14 days until due : 2.4 &#10;";
// 		score += 2.4;
// 	} else if (today < task.due.minus(_dv.duration("14 days"))) {
// 		explaination += "More than 14 days until due : 2.4 &#10;";
// 		score += 2.4;
// 	}

// 	if (task.dueIsDefault) {
// 		explaination += "due by default : -1.0 &#10;";
// 		score += -1.0;
// 	}

// 	if (!task.scheduled) {
// 		explaination += "Not scheduled : 0.0 &#10;";
// 		score += 0.0;
// 	} else if (today >= task.scheduled) {
// 		explaination += "Scheduled today or earlier : 5.0 &#10;";
// 		score += 5.0;
// 	} else if (today <= task.scheduled.minus(_dv.duration("1 days"))) {
// 		explaination += "Scheduled tomorrow or later : -3.0 &#10;";
// 		score += -3.0;
// 	} 

// 	let priorityScore = 0.0;
// 	if (task.priority === _configuration.fields.priority.values.highest.value) {
// 		priorityScore = 9.0;
// 	} else if (task.priority === _configuration.fields.priority.values.high.value) {
// 		priorityScore = 6.0;
// 	} else if (task.priority === _configuration.fields.priority.values.medium.value) {
// 		priorityScore = 3.9;
// 	} else if (task.priority === _configuration.fields.priority.values.none.value) {
// 		priorityScore = 1.95;
// 	} else if (task.priority === _configuration.fields.priority.values.low.value) {
// 		priorityScore = 0.0;
// 	} else if (task.priority === _configuration.fields.priority.values.lowest.value) {
// 		priorityScore = -1.8;
// 	}
// 	score += priorityScore;
// 	explaination += `Priority is '${task.priority}' : ${priorityScore}&#10;`;

// 	task.urgency = score;
// 	task.urgencyExplaination = explaination;
// }