const postcss = require('postcss')

module.exports = postcss.plugin('postcss-scss-import-rewrite', (opts) => {
  opts = opts || {};

  if (!opts.mutator) {
    throw new Error("postcss-scss-import-rewrite requires a 'mutator' options entry.")
  }

  return async (css, result) => {
    let promise = Promise.resolve(),
      atRules = []

    css.walkAtRules(node => {
      atRules.push(node)
    })

    for (var i in atRules) {
      let node = atRules[i]

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

        let newpath = await Promise.resolve(opts.mutator(importpath, node, literal, result))
        if (newpath !== undefined) {
          node.params = node.params.replace(importpath, newpath)
        }
      }
    }
  }

})
