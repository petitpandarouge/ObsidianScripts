References
- https://github.com/angular/angular/blob/main/contributing-docs/building-and-testing-angular.md#formatting-your-source-code

# Building and Testing Obsinflate

This document describes how to set up your development environment to build and test Obsinflate.

- [Prerequisite Software](#prerequisite-software)
- [Getting the Sources](#getting-the-sources)
- [Installing NPM Modules](#installing-npm-modules)
- [Building](#building)

## Prerequisite Software

- [Git](https://git-scm.com/) and/or the [GitHub app](https://github.com/apps/desktop) (for Mac and Windows); [GitHub's Guide to Installing Git](https://docs.github.com/fr/get-started/getting-started-with-git/set-up-git) is a good source of information.
- [Node.js](https://nodejs.org/fr), (version specified in [.nvmrc](https://github.com/petitpandarouge/ObsidianScripts/blob/main/obsinflate/.nvmrc)) which is used to run a development web server, run tests, and generate distributable files.
`.nvmrc` is read by [nvm](https://github.com/nvm-sh/nvm) commands like `nvm install` and `nvm use`.
Node.js comes with the [Node Package Manager](https://docs.npmjs.com/getting-started) which is used to install dependencies.

## Getting the Sources

Fork and clone the Obsinflate repository:

1. Login to your GitHub account or create one.
2. Fork the [main Obsinflate repository](https://github.com/petitpandarouge/ObsidianScripts).
3. Clone your fork of the Obsinflate directory.

``` sh
git clone git@github.com:<github username>/ObsidianScripts.git
```

4. Go to the `obsinflate` directory.

``` sh
cd obsinflate
```

## Installing NPM Modules

Next, install the JavaScript modules needed to build and test Obsinflate:

``` sh
npm install
```

## Building

To build Obsinflate run:

``` sh
npm run build
```

- Results are put in the `dist` folder.

## Testing and debugging

### Unit tests

The `tests` directory contains all the framework unit tests and relative sources. They are all written using the [jest](https://jestjs.io/) framework.

To debug threw `VS Code`
- Open a `Javascript Debug Terminal`;
- Add the wanted breakpoints into the code;
- And run the unit tests with the `npm run test:unit` command.

### Integration tests

Vaults per plugin have been configured in the `vaults` directory, and a `test:integration:<plugin-name>` command has been created to automatically launch the vault allowing you to integrate your scripts. The `How to debug.md` file of each vault will guide you threw the process.

> Note : The vaults must be opened explicitly once using the Obsidian UI for the command to work.

To see more about how this works, you can run the following commands to test it with the `UserPlugins` plugin `Hello World`.

``` sh
npm run bundle:helloworld
npm run test:integration:userplugins
```


Il reste les chapitres suivants :
https://github.com/angular/angular/blob/main/contributing-docs/building-and-testing-angular.md#formatting-your-source-code
## Formatting your source code
## Linting/verifying your Source Code
