const fs = require('fs'),
  sass = require('npm-sass'),
  path = require('path'),
  postcss = require('postcss'),
  syntax = require('postcss-scss'),
  extractLibrary = require('postcss-scss-extract-library'),
  sassImportRewrite = require('postcss-scss-node-sass-importer'),
  importDedup = require('postcss-scss-import-dedup'),
  importReorder = require('postcss-scss-import-reorder'),
  inlineComments = require('postcss-scss-inline-comments')

module.exports = async function (input, opts) {
  opts = opts || {}

  let importFilter,
    importerPlugin = opts.importer || sass.importer,
    inputFile = opts.inputFile || process.cwd(),
    basepath = path.dirname(path.resolve(inputFile))

  if (opts.importFilter) {
    importFilter = new RegExp(opts.importFilter)
  }

  const importer = sassImportRewrite({
      importer: importerPlugin,
      filter: (sourcepath, importpath, targetpath) => {
        let relativePath = path.dirname(targetpath)
          .replace(basepath, '')
          .replace(/^\/+/, '')

        return !importFilter || importFilter.test(relativePath)
      },
      fixBroken: opts.fixImports || false,
    }),

    extractor = extractLibrary({
      allowAll: opts.extract,
      disallowAll: opts.disallow,
    }),

    plugins = [importer, importDedup(), inlineComments()]

  if (opts.normalizeImports) {
    plugins.push(importReorder())
  }

  plugins.push(extractor)

  return postcss(plugins).process(input, { syntax: syntax, from: inputFile })
}
