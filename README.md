# scss-extractor

  [![Build Status](https://travis-ci.org/christophersmith262/scss-extractor.svg?branch=master)](https://travis-ci.org/christophersmith262/scss-extractor)
  [![Coverage Status](https://coveralls.io/repos/github/christophersmith262/scss-extractor/badge.svg?branch=master)](https://coveralls.io/github/christophersmith262/scss-extractor?branch=master)
  [![npm version](https://img.shields.io/npm/v/scss-extractor.svg?style=flat)](https://www.npmjs.com/package/scss-extractor)
  
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

### As an API

```
const extractor = require('scss-extractor')

extractor.run({ inputstring: "@mixin a-mixin() {}" }).then(result => {
  console.log(result)
})
```

### As a Gulp Plugin

Install the gulp plugin with `yarn`:

```
yarn add --dev gulp-scss-extractor
```

Or `npm`:

```
npm install --save-dev gulp-scss-extractor
```

And add it to your gulp processing chain:

```
const scssExtractor = require('gulp-scss-extractor')

gulp.task('extract-scss-library', () => {
  gulp.src('./inputfile.scss')
  	.pipe(scssExtractor)
  	.pipe(gulp.dest('./_outputfile.scss'))
})
```

See more options in the [gulp-scsss-extract readme]().

### As a Library of postcss Plugins

The scss-extractor package is built on the postcss project. It provides several postcss plugins that can be used independently of the high level extractor API:

- [postcssscss-scss-extract-library]():
  Extract mixins, functions, variable definitions from scss.
- [postcssscss-scss-import-dedup]():
  Remove duplicate `@import` statements from scss.
- [postcssscss-scss-import-reorder]():
  Ensure all `@import` statements appear at the beginning of the scss file.
- [postcssscss-scss-import-rewrite]():
  Rewrite an `@import` statement based on a callback.
- [postcssscss-scss-inline-comments]():
  Convert css comments to inline scss comments.
- [postcssscss-scss-node-sass-importer]():
  Applies a node-sass importer plugin to resolve `@import` statements.
