const fs = require('fs'),
  sass = require('npm-sass'),
  path = require('path'),
  postcss = require('postcss'),
  atImport = require('postcss-import'),
  syntax = require('postcss-scss'),
  extractLibrary = require('postcss-scss-extract-library'),
  sassImportRewrite = require('postcss-scss-node-sass-importer'),
  importDedup = require('postcss-scss-import-dedup'),
  importReorder = require('postcss-scss-import-reorder'),
  inlineComments = require('postcss-scss-inline-comments')

module.exports = async function (opts) {
  let importFilter, importerPlugin

  if (opts.importer) {
    importerPlugin = require(opts.importer)
  }
  else {
    importerPlugin = sass.importer
  }

  if (opts.importFilter) {
    importFilter = new RegExp(opts.importFilter)
  }

  const rewriter = sassImportRewrite({
      importer: importerPlugin,
      filter: (sourcepath, importpath, targetpath) => {
        let relativePath = path.dirname(targetpath).replace(path.dirname(path.resolve(opts.inputfile)), '')
        if (relativePath[0] == '/') {
          relativePath = relativePath.substr(1)
        }
        return !importFilter || importFilter.test(relativePath)
      },
      fixBroken: opts.fixImports || false,
    }),

    importer = atImport({
      filter: importpath => {
        // Only import things where the sassImportRewrite plugin
        // has converted the import to an absolute path.
        return /^\//.test(importpath)
      },
      plugins: [rewriter],
      root: path.dirname(path.resolve(opts.inputfile)),
    }),

    extractor = extractLibrary({
      allowAll: opts.extract,
      disallowAll: opts.disallow,
    }),

    input = await new Promise((accept, reject) => {
      fs.readFile(opts.inputfile, (err, data) => {
        if (err) {
          reject(err)
        }
        else {
          accept(data)
        }
      })
    }),

    plugins = [rewriter, importer, importDedup()]

  if (!opts.skipComments) {
    plugins.push(inlineComments())
  }

  plugins.push(extractor)

  return postcss(plugins).process(input, { syntax: syntax, from: opts.inputfile })
}
