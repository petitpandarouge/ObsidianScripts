---
tags:
  - inflate
  - inflates/macro
inflates: "[[QuickAdd]]"
dependencies:
  - "[[Kobo Highlights Extractor]]"
  - "[[Files Suggester]]"
  - "[[File Name Sanitizer]]"
---
## Configuration

Kindly see the macro configuration to have the configuration in details.
Here are the main decisions to take when configuring this macro on your side: 
### file-suggester step
- Define the annotations directory into the `Input - Directory Path` option.
### Create author note step
- Reference the template to use in the `Template Path` option.
- Select the folder where to create the note using the `Choose folder when creating a new note`.
### Create book note step
- The exact same decision as the `Create book note step` must be taken for this step.
## How to run

- Plug the Kobo to the PC
- Run the command `QuickAdd: Kobo Highlights Importer`
- Select the annotations file you want to import
- Result:
	- The book note and the author note into the `macros/Kobo Highlights Importer/GARDEN` folder,
	- The author note referenced into the `author` book note property.