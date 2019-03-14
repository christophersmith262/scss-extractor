const inliner = require('../../postcss-scss-inline-comments'),
  postcss = require('postcss'),
  syntax = require('postcss-scss')

module.exports = async function (input) {
  const result = await postcss([inliner]).process(input, { syntax: syntax, from: undefined })
  return result.css
}
