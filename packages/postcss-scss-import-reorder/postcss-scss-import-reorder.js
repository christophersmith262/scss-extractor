const postcss = require('postcss')

module.exports = postcss.plugin('postcss-scss-import-reorder', () => {

  function shouldSkip(node) {
    if (!node) {
      return false
    }

    return node.type == 'atrule'
      && (node.name == 'import' || node.name == 'charset')
  }

  function needsReorder(root, node) {
    if (node.parent.type != 'root') {
      return true
    }

    let n = node
    while(shouldSkip(n)) {
      n = n.prev();
    }

    return !!n
  }

  function reorder(root, node) {
    let target

    for (var i in root.nodes) {
      const n = root.nodes[i]

      if (shouldSkip(n)) {
        target = n
      }
      else {
        break;
      }
    }

    if (target) {
      target.after(node)
    }
    else if (root.nodes.length) {
      root.nodes[0].before(node)
    }
    else {
      root.append(node)
    }

  }

  return async css => {
    css.walkAtRules(node => {
      if (node.name == 'import') {
        if (needsReorder(css, node)) {
          reorder(css, node)
        }
      }
    })
  }

})
