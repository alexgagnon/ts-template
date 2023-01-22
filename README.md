# TypeScript Template

Starter repo for javascript apps and libraries written in typescript. To make it more similar to a "real" app, it also includes authentication based on OAuth2 and OpenID Connect and telemetry. It is strictly Node.js based, so the only thing you need is Node.JS 16+.

NOTE: it includes DEVELOPMENT ONLY and NON-PERSISTENT mocks for an Identity Provider for authentication, a nosql database for the persistance layer of the APIs, and key/value store for a distributed session store. They are only there to demonstrate how a complete application can be wired up. THESE SHOULD ABSOLUTELY NOT BE USED IN PRODUCTION, and are prefixed with `_` to identify them as such.

The repo is divided based on type, as they have different requirements.

1. api - backend abstraction layer
  1. rest
  2. graphql - UNDER DEVELOPMENT
2. frontend - browser-based application
  1. spa
  2. ssr
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

- opentelemetry - traces, metrics, and logs
- winston/morgan - logging
- lodash - utility functions
- dayjs - date functions
- express - server
- zod - schema validation
- typeorm - database ORM
- lit - web-components helper

## Recommended extensions

- sonarlint
- prettier
- eslint
- wireit

## Background

Node.JS is an excellent platform to be able to write full stack applications solely in JS. However, JS lacks the strong type system that enables catching a large amount of errors through static analysis and provides a less streamlined IDE experience. TS is a superset of JS that also adds a type system, and is quickly becoming the defacto standard for non-trivial applications.

The JS/TS ecosystem is also littered with many tools and frameworks, making it difficult to start new applications without sourcing many different tutorials/guides to come up with one that's production ready.

This repository seeks to make it easy to spin up new full stack applications written in TS, with modern tooling for building, testing, logging, and publishing.

### Tooling

There are goals that differ between environments, for example in development you want maximum developer experience, but favour user experience in production. There is a great deal of tooling involved in supporting these conflicting goals.

- compiling/transpiling - turning one language or feature sets into another. Commonly used for turning more modern versions of ECMAScript into older versions for compability, or from other languages such as Typescript.
- bundling - converting multiple modules into a single bundle to reduce network requests.
- minification - trimming whitespace, mangling names, and compression to reduce bandwidth.
- cache busting - naming files with a revision strategy (commonly the md5 hash of the file), to maximize caching performance.

The first thing to remember is where the code is running...

Each browser has their own Javascript engine (Chrome/Edge = v8, Safari = JavaScriptCore, Firefox = SpiderMonkey). NodeJS uses v8 with additional OS bindings included.

- Browser:

  - sandboxed, no direct access to OS
  - bundling, minification, and cache busting preferred for performance
  - may need to transpile if using another language or features not yet in all of the browsers you are using
  - modules:
    - IIFE - single file closures, good for not polluting window object, small bundles, and reduced number of resources
    - UMD - allows for loading of multiple module types including commonjs modules
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
- service layer - business logic, mapping/transforming between DTOs and Entities, etc.
- persistence layer - database and/or filesystem

In classic OOP, you'd have objects representing those in your persistence layer (Entities), and those that are involved in transferring data between services (Data Transfor Objects, DTOs).

If you use a relational database (Postgres, MySQL, SQL Server, SQLite, .etc), an Object Relational Mapper (ORM) helps with handling the interaction of OOP Entities with their counterparts in the database (typically one or more joined tables). This same notion can be extended to NoSQL databases that have well-defined schemas for their collections, such as MongoDB.

DTOs are typically shared between the interacting services (i.e. client-server) to ease serializing the data between them.

### Security

- user input validation - sql injection, regex bombs, dos
- csrf
- xss
- secret management

### Class/Object vs. Type vs. Schema

A constraint is additional narrowing down of allowable values, for example making sure a string has a minimum length.

- Types are only for shape and type composition, they don't include constraints but are good for static type analysis
- Classes/Objects are instances that may have a defined type. Additional constraint validation is done with parsers and/or validators
- Schemas are supersets of types and can include constraints, are either created in DSLs or in code with annotations/decorators

Many libraries have been created to infer and/or generate schemas, types, and objects from one another depending on a development strategy:

- Design-First - design a schema in some Domain Specific Language (DSL) such as GraphQLs Schema Definition Language (SDL) or a specification such as OpenAPI and/or JSON Schema, and generate the code for the objects and types.
- Code-First - explicitely write types, or define a class and extract the type, or write a schema and infer the generate the class and type.

There are also goals of reducing boiler-plate for common tasks, such as creating necessary database tables/collections to match Entities, generating CRUD operations for REST APIs, and generating resolvers for GraphQL queries and mutations. This is typically done with help of ORMs.

Generally the least friction comes from having the fewest sources of truth, and defining constraints in that source. It is also a best practice when using multiple services to design the API first so that the services can be developing concurrently and independentently from each other.

Unfortunately there isn't currently a jack-of-all-trades solution that fits well for ORM entities, GraphQL schemas, and general purpose validators.

The recommended libraries for doing this are:

- general purpose, DTOs - zod, define a code-based schema, extract the type and class
- Entities - typeorm, define a code-based schema, extract the type and class
- GraphQL - graphql-nexus - code-based GraphQL schema

### Configuration

### Observability
