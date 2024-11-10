# Commit message format

The commit message must follow the [AngularJS Commit Message Format](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit) and versions are automatically generated following the [Semantic Versioning](https://semver.org/) rules.

All the rules that must be followed are detailed in the [.gitmessage](https://github.com/petitpandarouge/ObsidianScripts/blob/master/obsinflate/.gitmessage) file.

## Allowed Commit Types

- `chore`: changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies or modify build system)
- `docs`: changes to the documentation
- `feat`: a new feature is introduced with the changes
- `fix`: bug fix has occured, not a fix to a build script
- `refactor`: refactoring production code, eg. renaming a variable
- `style`: formatting, missing semi colons, etc; no production code change
- `test`: adding missing tests, refactoring tests; no production code change

## Allowed Commit Scopes

- `obsidian`: changes in the production code relative to the Obsidian context
- `quickadd`: changes in the production code relative to the QuickAdd context
- `userplugins`: changes in the production code relative to the UserPlugins context
- `dataview`: changes in the production code relative to the Dataview context
- `ci`: changes in the Github CI (chore scope)
- `build`: changes in the build system (chore scope)
- `release`: new release pushed by the semantic release plugin (chore scope)
- `cms`: changes in the automated CMS (Content Managment System) check system (for example modifying commitlint rule or husky script) (chore scope)
- `integration`: changes the in the vault integration environment (chore scope)
