# Testing and debugging 🐞

## Unit tests

The `tests` directory contains all the framework unit tests and relative sources.

To debug threw `VS Code`
- Open a `Javascript Debug Terminal`;
- Add the wanted breakpoints into the code;
- And run the unit tests with the `npm run test:unit` command.

## Integration tests

All the scripts are webpacked with the source mapping option activated. It means that you'll be able to debug your code into Obsidian viewing the TypeScript version :sunglasses:

Vaults per plugin have been configured in the `vaults` directory, and a `test:integration:<plugin-name>` command has been created to automatically launch the vault allowing you to integrate your scripts. The `How to debug.md` file of each vault will guide you threw the process.

> Note : The vaults must be opened explicitly once using the Obsidian UI for the command to work.

To see more about how this works, you can run the following commands to test it with the `UserPlugins` plugin `Hello World`.

``` sh
cd obsinflate
npm install
npm run build
npm run bundle:helloworld
npm run test:integration:userplugins
```
