const postcss = require('postcss'),
  path = require('path'),
  rewrite = require('postcss-scss-import-rewrite'),
  defaultResolver = require('./lib/default-resolver'),
  resolve = require('./lib/resolve'),
  processContent = require('./lib/process-content'),
  loadContent = require('./lib/load-content')

module.exports = postcss.plugin('postcss-scss-node-sass-importer', (opts) => {
  opts = opts || {}

  if (!opts.importer) {
    throw new Error("postcss-scss-node-sass-importer requires an 'importer' options entry.")
  }

  const importer = opts.importer,
    resolver = opts.resolver || defaultResolver,
    fixBroken = opts.fixBroken || false,
    filter = opts.filter || false,
    plugins = opts.plugins || [],
    seen = {}

  const instance = rewrite({
    mutator: async (importpath, node, literal, result) => {
      if (literal) {
        let inputfile

        if (node.source) {
          inputfile = node.source.input.file
        }

        let file = await resolve(inputfile, importpath, importer, resolver)

        if (file) {
          if (!filter || await Promise.resolve(filter(inputfile, importpath, file))) {
            if (!seen[file]) {
              seen[file] = true
              const importedResult = await processContent(file, await loadContent(file), plugins)
              node.after(importedResult.root)
            }
            node.remove()
          }
        }
        else if (fixBroken) {
          node.remove()
        }
      }
    }
  })

  plugins.push(instance)

  return instance
})
