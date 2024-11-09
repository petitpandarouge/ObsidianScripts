# Jest considerations 🧠

[None of this API part can be referenced into a jest test dependency](https://www.moritzjung.dev/obsidian-collection/plugin-dev/testing/challengeswhentestingplugins/). To be able to still reference the Obsidian API in the main code, I've overloaded the "paths" variable in a tsconfig file specific to jest.

``` json
// tsconfig.jest.json
{
  "extends": "./tsconfig.json",

  "compilerOptions": {
    "paths": {
      ...
      "^obsidian$": ["tests/doubles/obsidian"] // This is the magic line 🪄
    }
  }
}
```

This way
- In a build (`npx tsc --project tsconfig.build.json`), `import { ... } from 'obsidian'` will reference the real Obsidian API.
- In a build for test (`npx tsc --project tsconfig.build.for.jest.json`), `import { ... } from 'obsidian'` will reference the `tests/doubles/obsidian` module.

> ⚠️ This means each time a `import { ... } from 'obsidian'` is writen, a mock interface must be written in `tests/doubles/obsidian`.

This hack allows
- to implement the inflates being able to have the intellisense of the real Obsidian API;
- to have a code protected by tests.
