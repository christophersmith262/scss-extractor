const postcss = require('postcss')

module.exports = postcss.plugin('postcss-scss-import-rewrite', (opts) => {
  opts = opts || {};

  if (!opts.mutator) {
    throw new Error("postcss-scss-import-rewrite requires a 'mutator' options entry.")
  }

  return async css => {
    let promises = []

    css.walkAtRules(node => {
      if (node.name == 'import') {
        let importpath = node.params,
          literal = false

        if (/^'.*'$/.test(importpath)) {
          importpath = importpath.replace(/^'(.*)'$/, '$1')
          literal = true
        }
        else if (/^".*"$/.test(importpath)) {
          importpath = importpath.replace(/^"(.*)"$/, '$1')
          literal = true
        }

        let promise = Promise.resolve(opts.mutator(importpath, node, literal))

        promise.then(newpath => {
          if (newpath !== undefined) {
            node.params = node.params.replace(importpath, newpath)
          }
        })

        promises.push(promise)
      }
    })

    return Promise.all(promises)
  }

})
