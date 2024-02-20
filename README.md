<!-- trunk-ignore-all(markdownlint/MD041) -->
<p align="center">
  <img alt="Bombastic Logo" src="https://github.com/oxcabe/bombastic/assets/25517190/e69819cf-25e9-42f0-8b9e-1af5d180b46a">
</p>
<h1 align="center">
  Bombastic
</h1>
<p align="center">
<a href="https://npmjs.com/package/bombastic-ifc"><img alt="NPM package badge" src="https://img.shields.io/npm/v/bombastic-ifc" /></a>
<a href="https://github.com/oxcabe/bombastic/actions/workflows/build-monorepo.yml"><img alt="Build status badge" src="https://img.shields.io/github/actions/workflow/status/oxcabe/bombastic/build-monorepo.yml" /></a>
<a href="https://github.com/oxcabe/bombastic?tab=MIT-1-ov-file#readme"><img alt="License badge" src="https://img.shields.io/npm/l/bombastic-ifc" /></a>

</p>

> Bombastic is in early stages of development. Until a major version is released, incompatibility changes may occur. If you have a feature proposal, found incorrect behavior or any suggestion, please consider [filing an issue](https://github.com/oxcabe/bombastic/issues/new/choose).

Bombastic creates _Bill of Materials_ (BoM) documents from _Industry Foundation Classes_ (IFC) files.

## Features

- Compatible with the [IFC2x3 TC1](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/) specification.
- Shipped both as a [command line tool](./packages/bombastic-cli/) and as a [dependency](./packages/bombastic/).
- Supported BoM formats: HTML.
- Project is 100% TypeScript.
- Native support for [Bun.sh](https://bun.sh/).

Bombastic also has the following features in its near-term roadmap:

- PDF BoM format support.
- Improved UX for `bombastic-cli`.
- Documentation website.
- Improved, configurable UI BoM templates.
- Support for [IFC4 ADD2 TC1](https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2_TC1/HTML/) and [IFC 4.3 ADD2](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/) specifications.

## Getting started

### Installation

#### Installing the command line tool

> Currently, the command-line tool is only supported in Linux-x86_64. Support for more systems and architectures will arrive gradually, based on ease of integration and community demand.

The command-line tool is available for download in the [latest bombastic-cli release](https://github.com/oxcabe/bombastic/releases?q=bombastic-cli&expanded=true/latest).

#### Installing the npm dependency

Adding the _npm_ dependency to your package is performed differently depending on your package manager.

Popular choices are:

```bash
# npm
npm install bombastic-ifc

# Yarn
yarn add bombastic-ifc

# pnpm
yarn add bombastic-ifc

# Bun
bun add bombastic-ifc
```

### Generating BoM documents

The following examples feature how to use an IFC file, `example.ifc` to generate an HTML BoM report, `example_bom.html`.

#### Using the command line tool

```bash
bombastic -i example.ifc -f html -o example_bom.html
```

#### Using the npm dependency

```typescript
import { BOMGenerator } from "bombastic-ifc";

// Instantiate the BoM generator
const generator = BOMGenerator();

// Generate BoM document file
generator.generate("example.ifc", "html", "example_bom.html");
```
