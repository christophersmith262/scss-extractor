# postcss-scss-extract-library

> [PostCSS](https://github.com/postcss/postcss) plugin to extract mixins, functions, variable definitions from sass.

## Installation

With `yarn`

```
$ yarn add postcss-scss-extract-library
```

Or `npm`:

```
$ npm install --save postcss-scss-extract-library
```

## Usage

```js
const fs = require('fs'),
	postcss = require('postcss'),
   syntax = require('postcss-scss'),
	extract = require('postcss-scss-extract-library')
	
const scss = fs.readFileSync('scss/input.scss', 'utf-8')
	
postcss([extract()]).process(scss, {
  syntax: syntax,
  from: 'scss/input.scss',
})
```

`scss/input.scss`:

```css
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

.u-important {
  @include important-element;
}

.u-standard-spacing {
  padding: get-spacing();
}
```

Will give you:

```css
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

### Options

The following is used to determine whether `atrules` get filtered out:

```
if atrule has an ancestor in the allowAll list:
  do not remove it
else if atrule is in the disallowAll list:
  remove it
```

And to determine if `rules` get filtered out:

```
if rule has ancestor in the allowAll list
  keep it
 else:
  remove it
```

The `allowAll` and `disallowAll` options can be used to determine which atrules and rules get kept.

The default configuration is inteded to keep all sass code that would not generate css if compiled.


**Example:**

```js
const disallow = extract.defaultDisallowAll.concat(['mixin'])

extract({ disallowAll: disallow, allowAll: ['function', 'import']})
```

Will remove `mixins` from the generated scss partial.

For more information see [the scss-extractor documentation](https://github.com/christophersmith262/scss-extractor).
