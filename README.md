# TypeScript Template

Starter repo for javascript apps and libraries written in typescript.

The repo is divided based on type, as they have different requirements

1. api - backend abstraction layer
2. frontend - HTML serving application
3. library - module for consumption in other apps (apis and/or frontends)
4. design-system - collection of frontend components

It includes the following developer tooling:

- wireit for script management
- husky for git hooks
- typescript for static type checking
- prettier for linting/formatting
- vite for bundling and dev server
- jest for unit tests
- k6 for smoke/load testing
- testing-library for DOM and JS framework tests
- playwright for e2e tests

It also demonstrates usage of some common libraries:

- lodash - utility functions
- dayjs - date functions
- express - server
- zod - schema validation
- lit - web-components helper

## Considerations

Common requirements:
- compiling/transpiling - turning one language or feature sets into another. Commonly used for turning more modern versions of ECMAScript into older versions for compability, or from other languages such as Typescript.
- bundling - converting multiple modules into a single bundle to reduce network requests.
- minification - trimming whitespace, mangling names, and compression to reduce bandwidth.
- cache busting - naming files with a revision strategy (commonly the md5 hash of the file), to maximize caching performance.

The first thing to remember is where the code is running...

Each browser has their own Javascript engine (Chrome/Edge = v8, Safari = JavaScriptCore, Firefox = SpiderMonkey). NodeJS uses v8.

- Browser:
  - sandboxed, no access to OS
  - bundling, minification, and cache busting preferred for performance
  - may need to transpile if using another language or features not yet in all of the browsers you are using
  - multiple methods of importing:
    - IIFE - single file closures, good for not polluting window object, small bundles, and reduced number of resources
    - UMD - allows for loading of multiple module types including commonjs modules, no longer commonly used
    - es6 modules - native modules, good for development since bundling is not required
- NodeJS:
  - access to OS through included modules, such as `fs`
  - no need to bundling, minification, or cache busting
  - may need to transpile if using another language or features not yet in the NodeJS version you're using
  - commonjs modules are default unless using .mjs extension, or setting `module: true` in package.json

