const postcss = require('postcss')

module.exports = postcss.plugin('postcss-scss-extract-library', (opts) => {
  opts = opts || {}

  // These will never directly result in CSS generation.
  const allowAll = opts.allowAll || ['mixin', 'function', 'import']

  // All these directly result in CSS getting output on compilation.
  const disallowAll = opts.disallowAll || [
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

  return async css => {

    // Checks if an AST node is part of a non-renderable section.
    function hasAllowedAncestor(node) {
      if (!node) {
        return false
      }

      if (node.type == 'atrule' && allowAll.includes(node.name)) {
        return true
      }

      return node.parent ? hasAllowedAncestor(node.parent) : false
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
