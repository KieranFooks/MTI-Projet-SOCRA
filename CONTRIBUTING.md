# Contribute to SOCRA Parcours

## Commit Message
Commits must be atomic. Commit messages must follow these guidelines.
```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                          elements|forms|http|language-service|localize|platform-browser|
  │                          platform-browser-dynamic|platform-server|router|service-worker|
  │                          upgrade|zone.js|packaging|changelog|docs-infra|migrations|ngcc|ve|
  │                          devtools
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test


The <type> and <summary> fields are mandatory, the (<scope>) field is optional but recommended.

Type must be one of the following:

    feat: A new feature
    fix: A bug fix
    perf: A code change that improves performance
    refactor: A code change that neither fixes a bug nor adds a feature nor improves performance
    build: Changes that affect the build system or external dependencies (example: npm)
    ci: Changes to our CI configuration files and scripts (example: Github Actions)
    doc: Documentation only changes
    test: Adding tests or correcting existing tests
```
