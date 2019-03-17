# postcss-scss-import-dedup

> [PostCSS](https://github.com/postcss/postcss) plugin to remove duplicate `@import` statements.

## Installation

With `yarn`

```
$ yarn add postcss-scss-import-dedup
```

Or `npm`:

```
$ npm install --save postcss-scss-import-dedup
```

## Usage

```js
const fs = require('fs'),
	postcss = require('postcss'),
	syntax = require('postcss-scss'),
	dedupImports = require('postcss-scss-import-dedup')
	
const scss = fs.readFileSync('scss/input.scss', 'utf-8')
	
postcss([dedupImports()]).process(scss, {
  syntax: syntax,
  from: 'scss/input.scss',
})
```

`scss/input.scss`:

```css
@import 'a';
@import 'b';
@import 'a';
```

Will give you:

```css
@import 'a';
@import 'b';
```

### Options

-----------------------------
#### `opts.filter `

A function that receives a an import string and determines if it should be tracked by the deduper. This can be used as an escape valve while using this plugin.

**Default:**

`null`

**Example:**

```js
dedupImports({
	filter: importpath => {
		return importpath == 'a'
	}
})
```

Will dedup only `@import 'a'` statements.

For more information see [the scss-extractor documentation](https://github.com/christophersmith262/scss-extractor).
