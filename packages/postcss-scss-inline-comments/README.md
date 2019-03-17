# postcss-scss-inline-comments

> [PostCSS](https://github.com/postcss/postcss) plugin to convert css multiline comments to sass inline comments.

## Installation

With `yarn`

```
$ yarn add postcss-scss-inline-comments
```

Or `npm`:

```
$ npm install --save postcss-scss-inline-comments
```

## Usage

```js
const fs = require('fs'),
	postcss = require('postcss'),
	syntax = require('postcss-scss'),
	inlineComments = require('postcss-scss-inline-comments')
	
const scss = fs.readFileSync('scss/input.scss', 'utf-8')
	
postcss([inlineComments()]).process(scss, {
  syntax: syntax,
  from: 'scss/input.scss',
})
```

`scss/input.scss`:

```css
/**
 * A mixin for important things.
 */
@mixin a-mixin {
  color: red;
}
```

Will give you:

```css
//
// A mixin for important things.
//
@mixin a-mixin {
  color: red;
}
```

For more information see [the scss-extractor documentation](https://github.com/christophersmith262/scss-extractor).
