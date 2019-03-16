const readCache = require('read-cache')

module.exports = targetpath => {
  return readCache(targetpath, "UTF-8")
}
