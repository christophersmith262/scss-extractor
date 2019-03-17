# postcss-scss-import-reorder

> [PostCSS](https://github.com/postcss/postcss) plugin to move `@import` statements to the top of a sass file.

## Installation

With `yarn`

```
$ yarn add postcss-scss-import-reorder
```

Or `npm`:

```
$ npm install --save postcss-scss-import-reorder
```

## Usage

```js
const fs = require('fs'),
	postcss = require('postcss'),
	syntax = require('postcss-scss'),
	reorderImports = require('postcss-scss-import-reorder')
	
const scss = fs.readFileSync('scss/input.scss', 'utf-8')
	
postcss([reorderImports()]).process(scss, {
  syntax: syntax,
  from: 'scss/input.scss',
})
```

`scss/input.scss`:

```css

@import 'a';

.u-important {
  @include important-element;
}

@import 'b';

.u-standard-spacing {
  padding: get-spacing();
}

@import 'c';
```

Will give you:

```css
@import 'a';
@import 'b';
@import 'c';

@if $set-spacing-size == 'big' {
  $global-spacing: '1.5rem' !global;
}
@else {
  $global-spacing: '1rem' !global;
}

@mixin important-element {
  color:red;
}

@function get-spacing() {
  return $global-spacing;
}
```

For more information see [the scss-extractor documentation](https://github.com/christophersmith262/scss-extractor).
