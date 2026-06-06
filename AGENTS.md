# AGENTS.md

## General

- Do not overengineer.
- Favor simple, direct, production-minded code.
- Do not optimize what does not need optimization.
- Do not abstract what does not need abstraction.
- Do not reorganize code into more layers unless there is a concrete benefit.

## Avoid Unnecessary Abstractions

Do not create:

- useless namespaces
- static functions without real need
- helper methods without real reuse
- wrappers
- adapters
- intermediate layers
- local lambdas used only to look organized
- unnecessary helper functions
- unnecessary caching
- unnecessary throttling
- unnecessary temporary variables
- unnecessary indirection
- speculative architecture

If code is simple, write it directly where it is used.

## Code Style

- prefer early return
- avoid `else`
- keep nesting minimal
- keep functions straightforward and flat
- do not hide simple logic behind abstractions
- only introduce a new function when it has real reuse or meaning
- only store a value in a variable when it improves readability or avoids actually expensive repeated work

## Naming

- Do not use `Handle` to delegate callbacks.
- Always use `On*Callback` naming, like `OnSpectatorTargetChangedCallback`.

## Git Workflow

- When the generated code is valid and the build passes, create a commit and push the branch.
- Do not create a commit or push before validation is complete.
