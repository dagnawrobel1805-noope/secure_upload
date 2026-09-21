# SecureUpload

Open-source, self-hostable file upload security pipeline.

## Project structure

This repository uses a modular monorepo layout. The root is kept clean for standard project files and configuration, while the reusable code is split into separate package folders under `packages/`.

```
.
├── README.md
├── package.json
├── package-lock.json
├── jest.config.js
├── .gitignore
├── uploads/
├── src/
│   ├── cli/
│   │   ├── check-uploads.js
│   │   ├── check-scan.js
│   │   └── check-clamav.js
│   ├── tools/
│   │   └── make-polyglot.js
│   └── ...
├── packages/
│   ├── core/
│   │   ├── src/
│   │   └── test/
│   ├── validators/
│   │   ├── src/
│   │   └── test/
│   ├── scanners/
│   │   ├── src/
│   │   └── test/
│   └── quarantine/
│       ├── src/
│       └── test/
├── node_modules/
└── test/
```

### Package responsibilities

- `packages/core`: shared contracts and pipeline execution primitives
- `packages/validators`: content, filename, ZIP, MIME, and polyglot validators
- `packages/scanners`: scan pipeline and scanner implementations
- `packages/quarantine`: quarantine storage and policy decisions
- `src/cli`: runtime entrypoints for local testing and manual verification

### Rule of thumb

Each package is independent and should depend only on `core` or on public interfaces, not on sibling packages unless explicitly required.

## Getting started

```bash
npm install
npm test
```

Run specific package tests:

```bash
npm run test:core
npm run test:validators
npm run test:scanners
npm run test:quarantine
```

Run the local CLI checks from the source tree:

```bash
npm run check:uploads -- uploads/eicar.txt text/plain
npm run check:scan
npm run check:clamav -- uploads/eicar.txt
npm run make:polyglot
```

## Validation behavior

Findings are recorded as structured results rather than thrown as exceptions. A file that fails validation is considered a normal, expected outcome; the pipeline records the finding and continues processing.

## Adding a new validator

1. Add a new module under `packages/validators/src/`.
2. Export it from `packages/validators/src/index.js`.
3. Add a matching test under `packages/validators/test/`.
4. Wire it into the validation pipeline assembly used by your app or service layer.

The validating functions should follow the project convention of returning findings instead of throwing errors.
