# TypeScript Template

Starter repo for javascript apps and libraries written in typescript.

The repo is divided based on type, as they have different requirements

1. api - backend abstraction layer
   1. rest - RFC
   2. graphql
2. frontend - HTML serving application
3. library - module for consumption in other apps (apis and/or frontends)
4. design-system - collection of frontend components

It includes the following developer tooling:

- wireit for script management
- husky for git hooks
- typescript for static type checking and transpiling
- eslint for linting JS/TS
- prettier for formatting
- jest for unit tests
- k6 for smoke/load testing

For packages requiring a dev server, bundling, and/or creating production-ready files:

- vite

And additionally for frontend:

- stylelint for linting CSS
- testing-library for DOM and JS framework tests
- playwright for e2e tests
- axe-core for a11y testing
- lighthouse for performance testing

It also demonstrates usage of some common libraries:

- winston/morgan - logging
- lodash - utility functions
- dayjs - date functions
- express - server
- class-validator - schema validation
- prisma - ORM/GraphQL resolver
- lit - web-components helper

## Background

### Tooling

There are goals that differ between environments, for example in development you want maximum developer experience, but favour user experience in production. There is a great deal of tooling involved in supporting these conflicting goals.

- compiling/transpiling - turning one language or feature sets into another. Commonly used for turning more modern versions of ECMAScript into older versions for compability, or from other languages such as Typescript.
- bundling - converting multiple modules into a single bundle to reduce network requests.
- minification - trimming whitespace, mangling names, and compression to reduce bandwidth.
- cache busting - naming files with a revision strategy (commonly the md5 hash of the file), to maximize caching performance.

The first thing to remember is where the code is running...

Each browser has their own Javascript engine (Chrome/Edge = v8, Safari = JavaScriptCore, Firefox = SpiderMonkey). NodeJS uses v8 with additional OS bindings included.

- Browser:

  - sandboxed, no access to OS
  - bundling, minification, and cache busting preferred for performance
  - may need to transpile if using another language or features not yet in all of the browsers you are using
  - modules:
    - IIFE - single file closures, good for not polluting window object, small bundles, and reduced number of resources
    - UMD - allows for loading of multiple module types including commonjs modules, no longer commonly used
    - es6 modules - native modules, good for development since bundling is not required

- NodeJS:
  - access to OS through included modules, such as `fs`
  - no need for bundling, minification, or cache busting
  - may need to transpile if using another language or features not supported by the NodeJS version you're using
  - modules:
    - commonjs modules are default
    - es6 modules can be used if files end with `.mjs` or `module: true` in package.json

### n-Tier applications

Separation of concerns with clean abstractions is a key design principal for maintainability. Typical layers include:

- presentation layer - browser, data sent to/from apis
- controller layer - request/response handling
- service layer - business logic, mapping/transforming values
- persistence layer - database and/or filesystem

In classic OOP, you'd have objects representing those in your persistence layer (Entities), and those that are involved in transferring data between services (Data Transfor Objects, DTOs).

If you use an relational database (Postgres, MySQL, SQL Server, SQLite, .etc), an Object Relational Mapper (ORM) helps with handling the interaction of Entities to their formats in the database (typically one or more joined tables).

DTOs are typically shared between the interacting services (i.e. client-server) to ease serializing the data between them.

### Security

- user input validation
- csrf
- xss
- secrets

### Class/Object vs. Type vs. Schema

A constraint is additional narrowing down of allowable values, for example making sure a string has a minimum length.

- Types are only for shape and type composition, they don't include constraints but are good for static type analysis
- Classes/Objects are instances that may have a defined type. Additional constraint validation is done with parsers and/or validators
- Schemas are supersets of types and can include constraints, are either created in DSLs or in code with annotations/decorators

Many libraries have been created to infer and/or generate schemas, types, and objects from one another depending on a development strategy:

- Design-First - design a schema in some Domain Specific Language (DSL) such as GraphQLs Schema Definition Language or a specification such as OpenAPI and/or JSON Schema, and generate the code for the objects and types.
- Code-First - explicitely write types, or the define a class/object and extract the type, or write a schema and infer the type.

There are also goals of reducing boiler-plate for common tasks, such as creating necessary database tables/collections to match Entities, generating CRUD operations for REST APIs, and generating resolvers for GraphQL queries and mutations.

Generally the least friction comes from having the fewest sources of truth, and defining constraints at the same time. It is also a best practice when using multiple services to design the API first so that the services can be developing concurrently and independentently from each other.

Unfortunately there isn't currently a jack-of-all-trades solution that fits well for ORM entities, GraphQL schemas, and general purpose validators

The recommended libraries for doing this are:

- DTOs, general purpose - zod, define a code-based schema, extract the type and class
- Entities - , define a code-based schema, extract the type and class
- GraphQL - graphql-nexus - code-based GraphQL schema

### Configuration

### Observability
