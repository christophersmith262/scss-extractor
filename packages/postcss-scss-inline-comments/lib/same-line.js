module.exports = function sameLine(node, method) {
  let currentline, nextline, next

  if (method == 'prev') {
    currentline = node.source.start.line
    next = node.prev()
    if (next) {
      nextline = next.source.end.line
    }
  }
  else if (method == 'next') {
    currentline = node.source.end.line
    let test = node.next()
    if (test) {
      test = node.next()
    }
    next = node.next()
    if (next) {
      nextline = next.source.start.line
    }
  }
  else {
    next = node.parent
    if (next) {
      if (next.type == 'root') {
        return false
      }
      if (node.source.end && next.source.end) {
        return node.source.start.line == next.source.start.line
          || node.source.end.line == next.source.end.line
      }
      else {
        return node.source.start.line == next.source.start.line
      }
    }
  }

  if (next && next.type == 'comment') {
    return sameLine(next, method)
  }
  else {
    return currentline === nextline
  }
}

