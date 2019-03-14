const fs = require('fs'),
  path = require('path'),
  run = require('../../index').run

function norm(css) {
  return css.replace(/\s+/g, ' ').trim()
}

module.exports = function(suite, normalize=false) {
  return async (name, opts) => {
    opts = opts || {}
    let testfile = path.dirname(module.parent.filename) + '/fixtures/' + suite + '/' + name + '.scss',
      expectedfile = path.dirname(module.parent.filename) + '/fixtures/' + suite + '/' + name + '.expected.scss'

    const expected = await new Promise(accept => {
      fs.readFile(expectedfile, (err, data) => {
        accept(data)
      })
    })

    opts.inputfile = testfile

    const result = await run(opts)
    if (normalize) {
      expect(norm(result.css)).toBe(norm(expected.toString()))
    }
    else {
      expect(result.css).toBe(expected.toString())
    }
  }
}
