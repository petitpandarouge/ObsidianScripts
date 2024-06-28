# ObsidianScripts

This project is a TypeScript framework that allows building extension scripts for the following Obsidian plugins : 
- [Dataview](https://blacksmithgu.github.io/obsidian-dataview/)
- [User Plugins](https://github.com/mnowotnik/obsidian-user-plugins)
- [Quick Add](https://quickadd.obsidian.guide/docs/)

The benefits of this framework are
- having a fully tested code, to easely maintain it,
- having a fully typed code, to easely read it.

## Building and bundling

`git clone` this repo and execute the following commands:

``` sh
cd ts
npm install
npm run build
npm run bundle
```

Resulting bundles are generated into the `bundles` directory.

## Deploying

The command is currently in build state but I plan to build a command that deploys the scripts into a vault directory.

## Debugging

All the scripts are webpacked with the source mapping option activated. It means that you'll be able to debug your code into Obsidian viewing the TypeScript version :sunglasses:

TODO : Add a screen shot.

## Implementing

- `src`: Contains mainly the Obsidian api objects plus some additional common utility classes.
- `src/user-plugins`: Contains the User Plugins specific sources.
- ... to be continued...