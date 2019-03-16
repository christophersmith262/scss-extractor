const postcss = require('postcss'),
  syntax = require('postcss-scss')

module.exports = async (targetpath, content, plugins) => {
  return await postcss(plugins).process(content, {
    syntax: syntax,
    from: targetpath,
  })
}
