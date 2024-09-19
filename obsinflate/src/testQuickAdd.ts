import { Urgency } from "@obsidian/urgency";

module.exports = async () => {
    debugger
    let urgency = new Urgency();
    console.log(urgency.getScore());
}