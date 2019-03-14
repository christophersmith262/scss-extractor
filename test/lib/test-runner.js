const fs = require('fs'),
  path = require('path'),
  postcss = require('postcss'),
  syntax = require('postcss-scss')

function norm(css) {
  return css.replace(/\s+/g, ' ').trim()
}

module.exports = function(suite, plugins, normalize=false) {
  return async function(name) {

    let testfile = path.dirname(module.parent.filename) + '/fixtures/' + suite + '/' + name + '.scss',
      expectedfile = path.dirname(module.parent.filename) + '/fixtures/' + suite + '/' + name + '.expected.scss'

    const input = await new Promise(accept => {
      fs.readFile(testfile, (err, data) => {
        accept(data)
      })
    }),
    expected = await new Promise(accept => {
      fs.readFile(expectedfile, (err, data) => {
        accept(data)
      })
    })

    result = await postcss(plugins)
      .process(input.toString(), { syntax: syntax, from: testfile })

    if (normalize) {
      expect(norm(result.css)).toBe(norm(expected.toString()))
    }
    else {
      expect(result.css).toBe(expected.toString())
    }
  }
}
