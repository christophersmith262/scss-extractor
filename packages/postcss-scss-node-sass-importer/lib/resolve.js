const exists = require('./exists')

module.exports = async function(sourcepath, importpath, importer, resolver) {
  return new Promise(accept => {
    importer(importpath, sourcepath, async data => {
      accept(await Promise.resolve(resolver(sourcepath, importpath, data.file)))
    })
  })
}
