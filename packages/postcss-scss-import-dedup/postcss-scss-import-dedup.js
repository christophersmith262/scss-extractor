const postcss = require('postcss'),
  rewrite = require('postcss-scss-import-rewrite')

module.exports = postcss.plugin('postcss-scss-import-dedup', (opts) => {
  opts = opts || {}

  const seen = {}

  return rewrite({
    mutator: async (importpath, node, literal) => {
      if (literal && (!opts.filter || await Promise.resolve(opts.filter(importpath)))) {
        if (seen[importpath]) {
          node.remove()
        }
        else {
          seen[importpath] = true
        }
      }
    }
  })

})
