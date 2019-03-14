const path = require('path'),
  exists = require('./exists')

module.exports = async function(sourcepath, importpath, targetpath) {
  if (!sourcepath) {
    sourcepath = process.cwd()
  }

  if (!targetpath) {
    return false
  }

  let file = path.resolve(path.dirname(sourcepath), targetpath)

  if (!await exists(file) && path.extname(file) != '.scss') {
    file += '.scss'
  }

  if (!await exists(file) && !/^_/.test(path.basename(file))) {
    file = path.dirname(file) + '/_' + path.basename(file)
  }

  return await exists(file) ? file : false
}
