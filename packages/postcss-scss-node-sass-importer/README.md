# postcss-scss-node-sass-importer

> [PostCSS](https://github.com/postcss/postcss) plugin to resolve and inline `@import` statements using a [node-sass](https://github.com/sass/node-sass) importer instance.

**Why not [postcss-import](https://github.com/postcss/postcss-import)?** `postcss-import` follows the css `@import` spec, not the sass `@import` spec, which can lead to errors or unpredicted results when parsing scss files.

By using a `node-sass` importer to resolve imports, you can use the exact same import process as your scss compiler.

## Notes

* Like the `postcss-import` plugin, you will want to apply this plugin as early as possible in the chain so you can treat the output as a single scss string.
* Like the `postcss-import` plugin, duplicates will only be inlined once, at the highest point they occur.
* Unline the `postcss-import` plugin, this plugin _does not follow the css `@import` spec_.

## Installation

With `yarn`

```
$ yarn add postcss-scss-node-sass-importer
```

Or `npm`:

```
$ npm install --save postcss-scss-node-sass-importer
```

## Usage

```js
const fs = require('fs'),
	postcss = require('postcss'),
	syntax = require('postcss-scss'),
	importer = require('postcss-scss-node-sass-importer')
	
const scss = fs.readFileSync('scss/input.scss', 'utf-8')
	
postcss(importer()).process(scss, {
  syntax: syntax,
  from: 'scss/input.scss',
})
```

`scss/input.scss`:

```css
@import 'npm-package'
```

Will give you:

```css
... The expanded npm package scss
```

### Options

-----------------------------
#### `opts.importer`

The `node-sass` importer plugin to use.

See the [npm-sass importer](https://github.com/lennym/npm-sass/blob/master/lib/importer.js).

**Default:**

`require('npm-sass').importer`

-----------------------------
#### `opts.resolver`

Takes the output from the `node-sass` importer and resolves it to a file on the file system.

See the [default resolver](https://github.com/christophersmith262/scss-extractor/blob/master/packages/postcss-scss-node-sass-importer/lib/default-resolver.js).

**Default:**

`require('./lib/default-resolver')`

-----------------------------
#### `opts.fixBroken`

Removes unresolvable `@import` statements instead of triggering an error.

**Default:**

`false`

-----------------------------
#### `opts.filter`

A `function` that allows you to filter which `@import` statements get inlined.

```
<bool> [async] filter(<String> sourcepath, <String> importpath, <string> targetpath)
```

* `sourcepath` is the path to the file that has the `@import` statement.
* `importpath` is the contents of the `@import` statement.
* `targetpath` is the resolved local filesystem path.


The function should return `true` to inline the import, `false` otherwise.

-----------------------------
#### `opts.plugins`

A list of postcss plugins to apply on imported content. This usually should not be necessary. You typically want to apply plugins at the root level _after_ inlining has already happened.

For more information see [the scss-extractor documentation](https://github.com/christophersmith262/scss-extractor).
