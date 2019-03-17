# postcss-scss-import-rewrite

> [PostCSS](https://github.com/postcss/postcss) plugin to rewrite `@import` statements.

## Installation

With `yarn`

```
$ yarn add postcss-scss-import-rewrite
```

Or `npm`:

```
$ npm install --save postcss-scss-import-rewrite
```

## Usage

```js
const fs = require('fs'),
	postcss = require('postcss'),
	syntax = require('postcss-scss'),
	rewriteImports = require('postcss-scss-import-rewrite')
	
const scss = fs.readFileSync('scss/input.scss', 'utf-8')
	
postcss([
	rewriteImports({
		mutator: (importpath, node, literal, result) => {
		  return importpath + '.scss'
		}),
	})
]).process(scss, {
  syntax: syntax,
  from: 'scss/input.scss',
})
```

`scss/input.scss`:

```css
@import 'a';
@import 'b';
@import 'c';
```

Will give you:

```css
@import 'a.scss';
@import 'b.scss';
@import 'c.scss';
```

### Options

-----------------------------
#### `opts.mutator`

A required option specifying a `function` that will mutate the import statement.

```
<String|undefined> [async] mutator(<String> importpath, <PostCss.AtNode> node, <bool> literal, <PostCss.Result> result)
```

* `importpath` is the path as it appeared in the statement.
* `node` is the postcss atnode being processed.
* `literal` specifies whether the import statement references a string literal.
* `result` is the postcss result, allowing you to add warnings or messages.

If the mutator returns a string, the string will replace any references to `importpath` in the statement. If the mutator returns `undefined` no further action is taken on the node.

For complex statements (for instance, if `literal` is `false`), it makes sense to return undefined and directly operate on the `node` itself in the mutator.

For more information see [the scss-extractor documentation](https://github.com/christophersmith262/scss-extractor).
