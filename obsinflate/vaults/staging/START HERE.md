## Considerations

Obsinflate-ly speaking, an `inflate` is represented by a `JS module script`.
When it comes to talk about Obsidian, an inflate can be a `combination of several inflates`.

Let's take the `Kobo Highlights Importer` macro as example.
For the macro to be able to work, it uses several Obsinflate inflates :
- `Kobo Highlights Extractor`
- `Variable Mapper`
- etc

This documentation will aggregate all the inflates, either JS modules and specific plugin concepts (macro, view...) if the distinction is needed.
## Global organisation

- The `INFLATES` directory contains the documentation of the inflates.
	- Inflates are organized by entry point plugin.
	- If needed, an inflate can be represented by a directory having the name of the inflate.
		- This directory contains the directory organisation and the notes needed for the inflate to work properly.
	- An inflate note having the inflate name must document the inflate.
	- An inflate note can be initialized using the `TEMPLATES/Inflate` template.
- The `PLUGINS` directory contains all the plugins used  by the inflates.
	- Each note describes the configuration to apply for the inflates to work properly.
	- A plugin note can be initialized using the `TEMPLATES/Plugin` template.
- The `RESOURCES` directory contains all the images and other resources references by the notes.
- The `SCRIPTS` directory contains all the inflate module scripts.
- The `TEMPLATES` directory contains the templates that must be used to create this documentation.
## Graph view

The graph view is configured to display only the documentation notes.
To exclude an inflate configuration note from the documentation, the `documentation/exclude` tag can be used.
## Plugins

Here is the plugins used by the inflates.
```dataview
LIST 
FROM #plugin AND !"TEMPLATES" 
```
## Inflates

Here is the inflates list.
```dataview
LIST
FROM #inflate AND !"TEMPLATES"
```
