# [1.1.0](https://github.com/petitpandarouge/ObsidianScripts/compare/obsinflate-1.0.0...obsinflate-1.1.0) (2024-10-06)


### Bug Fixes

* fix the unique name generation seed managment ([84707e9](https://github.com/petitpandarouge/ObsidianScripts/commit/84707e971c839828befeed777e13d846baf0e016))


### Features

* raise a DuplicatedIdError if id already used in IdValidator ([974e34e](https://github.com/petitpandarouge/ObsidianScripts/commit/974e34e20bc61bd4892a72bfd30aba0a655bf1ae))

# [1.0.0](https://github.com/petitpandarouge/ObsidianScripts/compare/obsinflate-0.12.0...obsinflate-1.0.0) (2024-10-06)


### Code Refactoring

* new src code organisation ([#37](https://github.com/petitpandarouge/ObsidianScripts/issues/37)) ([844a2e7](https://github.com/petitpandarouge/ObsidianScripts/commit/844a2e7bf68aee229dfa5660e81880d31de7aba1))


### BREAKING CHANGES

* The aim of this ticket is to add clarity into the code structure.
In the current organisation, it was hard to know where to store the implementations (src root dir, infrastructure,...).

The decision here is to make more explicit the API usage.
It's a specific infrastructure bloc that deserves more focus.

Core part of the framework is as well important.
It has been made explicit by the directory addition.

Hello World samples, like the Inflates, have been putted in a separated directory so that it does not add noise anymore in the usefull code.

The is the final result :
- api: Interfaces and extensions wrapping the Obsidian and plugins API calls.
- core: The obsinflate framework implementations.
- infrastructure: Technical services mainly here to make the Obsinflate code testable using the dependency injection.
- hello-world: Samples.
- inflates: The inflates implementations.

# [0.12.0](https://github.com/petitpandarouge/ObsidianScripts/compare/obsinflate-0.11.1...obsinflate-0.12.0) (2024-10-04)


### Features

* **inflates:** implement the newuniquenotecommand userplugins command ([#28](https://github.com/petitpandarouge/ObsidianScripts/issues/28)) ([2c168ad](https://github.com/petitpandarouge/ObsidianScripts/commit/2c168ad9042a225d9ca323fd49ddfc6ce75df10a))

## [0.11.1](https://github.com/petitpandarouge/ObsidianScripts/compare/obsinflate-0.11.0...obsinflate-0.11.1) (2024-09-26)


### Bug Fixes

* The version was never updated by semantic release in the package.json. ([036e91b](https://github.com/petitpandarouge/ObsidianScripts/commit/036e91bceee65a1fe3568f461ecb5fe8dd2b8020))

# [0.11.0](https://github.com/petitpandarouge/ObsidianScripts/compare/obsinflate-0.10.0...obsinflate-0.11.0) (2024-09-26)


### Features

* Adding the changelog in the release build by semantic release. ([205e76f](https://github.com/petitpandarouge/ObsidianScripts/commit/205e76f5a4361ad21c212aa32f56a8ee406dd73f))
