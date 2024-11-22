---
tags:
  - inflate
  - inflates/macro
inflates: "[[QuickAdd]]"
dependencies:
  - "[[Active File Infos]]"
  - "[[String Variable Setter]]"
  - "[[Variable Formatter]]"
  - "[[Note Property Updater]]"
---
## Why

When I work on my projects, sometimes a simple task is enough to follow it.
But when the task becomes bigger and specially when I need to take note relatively, I want to be able to quickly transform it to a note and still have the link to the parent without losing the description.
## Configuration

Kindly see the macro configuration to have the configuration in details.
Here are the main decisions to take when configuring this macro on your side: 
### Create task note step
- Reference the template to use in the `Template Path` option.
- Select the folder where to create the note using the `Choose folder when creating a new note`.
### String Variable Setter step
- Make the property name fits the task template property name that must be filled.
	- In this sample, the name of the property is `task-of`.
## How to run

- Select the description of a task in a parent note
- Run the command `QuickAdd: New Task Note`
- Result:
	- A unique note is created in the parent note folder,
	- Its name is the task description,
	- It is linked to the parent note through the `task-of` property.