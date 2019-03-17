# scss-extractor

  [![Build Status](https://travis-ci.org/christophersmith262/scss-extractor.svg?branch=master)](https://travis-ci.org/christophersmith262/scss-extractor)
  [![Coverage Status](https://coveralls.io/repos/github/christophersmith262/scss-extractor/badge.svg?branch=master)](https://coveralls.io/github/christophersmith262/scss-extractor?branch=master)
  [![npm version](https://img.shields.io/npm/v/scss-extractor.svg?style=flat)](https://www.npmjs.com/package/scss-extractor) [![Greenkeeper badge](https://badges.greenkeeper.io/christophersmith262/scss-extractor.svg)](https://greenkeeper.io/)
  
Make sharing mixins, partials, and variables across web properties a breeze by effortlessly generating a shipable sass library for your design system.

Just give `scss-extractor` an entry point to sass code that is shared across multiple sites and it will extract your mixins, partials, and variables into a sass partial for inclusion in other builds.

This allows you to share precompiled core css across projects, while also providing a shared sass library.
  
## Ways to use scss-extractor

There are a few a ways you can use scss-extractor.

### As a Standalone Executable

Install the extractor with `yarn`:

```
yarn add --dev scss-extractor
```

Or `npm`:

```
npm install --save-dev scss-extractor
```

Then run the extractor on a scss file:

```
scss-extractor inputfile.scss > _outputfile.scss
```

Execute `scss-extractor --help` to get a list of command line options. Each command line options maps to an API option shown in the table below.

### As an API

Example:

```
const extractor = require('scss-extractor')

extractor.run("@mixin a-mixin() {}").then(result => {
  console.log(result)
})
```

The extractor can be called programatically using either the generic run function as shown above:

```
<PostCSS.Result> async function run(<string> input, <Object> opts)
```

Or it can be called through the cli wrapper. The only difference is that the cli wrapper loads the file based on the `opts` array for you:

```
<PostCSS.Result> async function runCli(<Object> opts)
```

Each function takes an opts array with configuration, and returns a PostCSS result object. The transformed scss is contained in `result.css`.

### Options

The following options can be provided either on the command line or through the `opts` array:

-----------------------------
#### `opts.inputFile`

The path to the scss entrypoint. If this is not provided, imports will be resolved using `process.cwd()` as the root path.

**Default:** `null`

**Command Line Argument:** `<1>`

-----------------------------
#### `opts.importFilter `

Filters which sass imports are aggregated. The
value being filtered is the path to the resolved
import relative to `inputFile`.

**Default:** `null`

**Command Line Argument:** `-i, --importfilter=...`

**Examples:**

This will expand `@my-org/...` imports only.

*Command Line Example:* `--importfilter=^node_modules/@my-org`
*API Example*: `{ importfilter: '^node_modules/@my-org' }`

-----------------------------
#### `opts.importer `

This option is not available on a cli. It allows
you to swap the importer with any node-sass
compatible importer.

**Default:** `require('npm-sass').importer`

-----------------------------
#### `opts.fixImports `


This will discard any unresolvable imports
from the generated sass partial.

**Default:** `false`

**Command Line Argument:** `-f, --fix-imports`

-----------------------------
#### `opts.extract `

Atrules in the allowed list will be extracted
into the generated sass partial.

**Default:** `['mixin', 'function', 'import']`

**Command Line Argument:** `-e <atrules>, --extract=<atrules>`

-----------------------------
#### `opts.disallow `

Atrules in the disallow list will be completely
removed from the generated sass partial upon

encounter. This is generally reserved for
anything that would generate css output if
compiled.

**Default:**

```
[
  'annotation',
  'character-variant',
  'charset',
  'counter-style',
  'document',
  'font-face',
  'font-feature-values',
  'include',
  'keyframes',
  'media',
  'namespace',
  'ornaments',
  'page',
  'stylistic',
  'stylesheet',
  'supports',
  'swash',
  'viewport',
]
```

**Command Line Argument:** `-d <atrules>, --disallow=<atrules>`

-----------------------------
#### `opts.normalizeImports `

Collects the imports that did not pass the
`importFilter` at the top of the file.

**Default:** `false`
**Command Line Argument:** `-n, --normalize-imports`

### As a Library of postcss Plugins

The scss-extractor package is built on the postcss project. It provides several postcss plugins that can be used independently of the high level extractor API:

- [postcss-scss-extract-library](https://github.com/christophersmith262/scss-extractor/tree/master/packages/postcss-scss-extract-library):
  Extract mixins, functions, variable definitions from scss.
- [postcss-scss-import-dedup](https://github.com/christophersmith262/scss-extractor/tree/master/packages/postcss-scss-import-dedup):
  Remove duplicate `@import` statements from scss.
- [postcss-scss-import-reorder](https://github.com/christophersmith262/scss-extractor/tree/master/packages/postcss-scss-import-reorder):
  Ensure all `@import` statements appear at the beginning of the scss file.
- [postcss-scss-import-rewrite](https://github.com/christophersmith262/scss-extractor/tree/master/packages/postcss-scss-import-rewrite):
  Rewrite an `@import` statement based on a callback.
- [postcss-scss-inline-comments](https://github.com/christophersmith262/scss-extractor/tree/master/packages/postcss-scss-inline-comments):
  Convert css comments to inline scss comments.
- [postcss-scss-node-sass-importer](https://github.com/christophersmith262/scss-extractor/tree/master/packages/postcss-scss-node-sass-importer):
  Applies a node-sass importer plugin to resolve and load `@import` statements.
