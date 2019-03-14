const fs = require('fs')

module.exports = async function exists(filepath) {
  return new Promise(accept => {
    try {
      fs.lstat(filepath, (err, stats) => {
        accept(stats && stats.isFile())
      })
    }
    catch (e) {
      return accept(false)
    }
  })
}
