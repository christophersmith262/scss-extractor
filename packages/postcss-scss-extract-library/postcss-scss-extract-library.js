const postcss = require('postcss')

const plugin = postcss.plugin('postcss-scss-extract-library', (opts) => {
  opts = opts || {}

  // These will never directly result in CSS generation.
  const allowAll = opts.allowAll || plugin.defaultAllowAll

  // All these directly result in CSS getting output on compilation.
  const disallowAll = opts.disallowAll || plugin.defaultDisallowAll

  return async css => {

    // Checks if an AST node is part of a non-renderable section.
    function hasAllowedAncestor(node) {
      if (!node) {
        return false
      }

      if (node.type == 'atrule' && allowAll.includes(node.name)) {
        return true
      }

      return hasAllowedAncestor(node.parent)
    }

    // Remove AST nodes that will result in css generation.
    css.walk(node => {
      const allowedSubtree = hasAllowedAncestor(node)

      if (!allowedSubtree && node.type == 'rule') {
        node.remove()
      }
      else if (!allowedSubtree && node.type == 'atrule' && disallowAll.includes(node.name)) {
        node.remove()
      }
    })
  }

})

plugin.defaultAllowAll = ['mixin', 'function', 'import']

plugin.defaultDisallowAll = [
  'annotation',
  'character-variant',
  'charset',
  'counter-style',
  'document',
  'font-face',
  'font-feature-values',
  'include',
  'keyframes',
  'media',
  'namespace',
  'ornaments',
  'page',
  'stylistic',
  'stylesheet',
  'supports',
  'swash',
  'viewport',
]

module.exports = plugin
