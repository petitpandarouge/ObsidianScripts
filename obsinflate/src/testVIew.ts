import { Urgency } from "@obsidian/urgency";

export function create(dv: any, input: any) {
    debugger
    let urgency = new Urgency();
    console.log(urgency.getScore());
    console.log(dv);
    console.log(input);

    dv.table(
        ["Nom", "Ids"], 
        [
            [urgency.getScore(), urgency.getScore()]
        ]
    );
}

