---
tags:
  - inflate
  - inflates/macro
dependencies:
  - "[[QuickAdd]]"
  - "[[Kobo Highlights Extractor]]"
  - "[[Files Suggester]]"
---
## Configuration

Kindly see the macro configuration to see the configuration in details.
Here are the main decisions to make when configuring this macro on your side: 
### Create book note step
- Reference the template to use in the `Template Path` option.
- Select the folder where to create the note using the `Choose folder when creating a new note`.
### Create author note step
- The exact same decision as the `Create book note step` must be taken for this step.
## How to run

- Plug the Kobo to the PC
- Run the command `QuickAdd: Kobo Highlights Importer`
- Select the annotations file you want to import
- Result:
	- The book note and the author note into the `macros/Kobo Highlights Importer/GARDEN` folder,
	- The author note referenced into the `author` book note property.