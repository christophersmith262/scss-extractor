const postcss = require('postcss'),
  path = require('path'),
  rewrite = require('postcss-scss-import-rewrite'),
  defaultResolver = require('./lib/default-resolver'),
  resolve = require('./lib/resolve')

module.exports = postcss.plugin('postcss-scss-node-sass-importer', (opts) => {
  opts = opts || {}

  if (!opts.importer) {
    throw new Error("postcss-scss-node-sass-importer requires an 'importer' options entry.")
  }

  const importer = opts.importer,
    resolver = opts.resolver || defaultResolver,
    fixBroken = opts.fixBroken || false,
    filter = opts.filter || false

  return rewrite({
    mutator: async (importpath, node, literal) => {
      if (literal) {
        let inputfile

        if (node.source) {
          inputfile = node.source.input.file
        }

        let file = await resolve(inputfile, importpath, importer, resolver)

        if (file) {
          if (!filter || filter(inputfile, importpath, file)) {
            node.params = node.params.replace(importpath, file)
          }
        }
        else if (fixBroken) {
          node.remove()
        }
      }
    }
  })

})
