const postcss = require('postcss'),
  sameLine = require('./lib/same-line')

module.exports = postcss.plugin('postcss-scss-inline-comments', () => {

  // Most of the complexity here is more to do with trying to normalize
  // whitespace for prettier display rather than functional necessity. 
  return async css => {
    css.walkComments(comment => {
      if (!comment.raws.inline) {
        // Each newline must be split out into a separate comma AST node,
        // otherwise only the first line gets commented out.
        let lines = comment.text.split(/\r?\n/).map(line => {
          return new postcss.comment({
            text: line.replace(/^\s*\*/, ''),
            source: comment.source,
            raws: {
              inline: true,
              left: comment.raws.left.replace(/\r?\n/g, ''),
              before: comment.raws.before.replace(/\r?\n/g, ''),
              right: "\n",
              after: "",
            },
          })
        })

        // Use the full left spacing of the original comment on the first
        // generated comment only.
        lines[0].raws.left = comment.raws.left
        lines[0].raws.before = comment.raws.before

        // This is only here to make docblocs look a little better.
        if (/\n/.test(comment.raws.right)) {
          lines.push(new postcss.comment({
            text: '',
            source: comment.source,
            raws: {
              inline: true,
              left: comment.raws.left.replace(/\r?\n/g, ''),
              before: comment.raws.before.replace(/\r?\n/g, ''),
              right: '',
              after: '',
            }
          }))
        }
        else {
          let eol = comment.raws.right.replace(/([ ]|\t)+$/, ''),
            bol = ''

          if (comment.next()) {
            bol = comment.next().raws.before + comment.next().raws.left
          }

          if (comment.raws.after) {
            eol += comment.raws.after
          }

          // If there is other stuff on the same line after the comment, we need
          // to add a line break to prevent accidently commenting out code.
          if (sameLine(comment, 'next') || sameLine(comment, 'parent')) {
            if (!/\n/.test(eol) && !/\n/.test(bol)) {
              eol += "\n"
            }
          }
          lines[lines.length - 1].raws.right = eol
          lines[lines.length -1].raws.after = ''
        }

        // If we needed to add a linebreak above, we should also strip the excess
        // leading whitespace from the newly inserted item.
        if (sameLine(comment, 'next')) {
          comment.next().raws.before = comment.next().raws.before.replace(/^\s+/, '')
        }
        else if (sameLine(comment, 'parent') && !comment.next()) {
          comment.parent.raws.after = comment.parent.raws.before.replace(/^\s+/, '')
        }

        comment.replaceWith(lines)
      }
    })
  }

})
