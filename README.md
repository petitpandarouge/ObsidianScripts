# ObsidianScripts 📜

This is the name I use to identify the very first scripts I have written to inflate Obsidian.
They are written in JS, and can be opened using the `ObsidianScripts.code-workspace` file.

It's a good version to work with, but I'm now afraid of modifying them and break something as they are not protected by tests.
This is where `Obsinflate` comes into the game.

I keep them here as I slowly but surely move them into the `Obsinflate` framework.

# Obsinflate 🎈

[![Test](https://github.com/petitpandarouge/ObsidianScripts/workflows/Build%20and%20test%20project/badge.svg)](https://github.com/petitpandarouge/ObsidianScripts/actions?query=workflow%3A%22Build+and+test+project%22) 
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

TypeScript framework that allows building extension scripts for the following Obsidian plugins : 
- [Dataview](https://blacksmithgu.github.io/obsidian-dataview/)
- [User Plugins](https://github.com/mnowotnik/obsidian-user-plugins)
- [Quick Add](https://quickadd.obsidian.guide/docs/)

## Highlights

The benefits of this framework are
- having a fully tested code, to easely **maintain** it,
- having a fully typed code, to easely **read** it.

The framework is implemented following the [TDD](https://en.wikipedia.org/wiki/Test-driven_development) method. The tests are then the [specs](https://html-preview.github.io/?url=https://github.com/petitpandarouge/ObsidianScripts/blob/main/obsinflate/reports/test-report.html) 🔥.

> 🔎 NOTE : In the whole documentation, I call `inflates` all the scripts implemented using this framework.

## Documentation

- Development Workflow
  - [Setting up](https://github.com/petitpandarouge/ObsidianScripts/blob/master/obsinflate/docs/development-workflow/setting-up.md)
  - [Building and bundling](https://github.com/petitpandarouge/ObsidianScripts/blob/master/obsinflate/docs/development-workflow/building-and-bundling.md)
  - [Inflating](https://github.com/petitpandarouge/ObsidianScripts/blob/master/obsinflate/docs/development-workflow/inflating.md)
  - [Testing and debugging](https://github.com/petitpandarouge/ObsidianScripts/blob/master/obsinflate/docs/development-workflow/testing-and-debugging.md)
  - [Deploying](https://github.com/petitpandarouge/ObsidianScripts/blob/master/obsinflate/docs/development-workflow/deploying.md)
- Working with Obisidian API 
  - [Jest considerations](https://github.com/petitpandarouge/ObsidianScripts/blob/master/obsinflate/docs/working-with-obsidian-api/jest-considerations.md)
  - [Webpack considerations](https://github.com/petitpandarouge/ObsidianScripts/blob/master/obsinflate/docs/working-with-obsidian-api/webpack-considerations.md)
  - [Module functions considerations](https://github.com/petitpandarouge/ObsidianScripts/blob/master/obsinflate/docs/working-with-obsidian-api/module-functions-considerations.md)
- Usages
  - [Configuring inflates into Obsidian](https://github.com/petitpandarouge/ObsidianScripts/blob/master/obsinflate/docs/usages/configuring-inflates-into-obsidian.md)
- Contributing
  - [Coding rules](https://github.com/petitpandarouge/ObsidianScripts/blob/master/obsinflate/docs/contributing/coding-rules.md)
  - [Commit message format](https://github.com/petitpandarouge/ObsidianScripts/blob/master/obsinflate/docs/contributing/commit-message-format.md)