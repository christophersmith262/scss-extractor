const readCache = require('read-cache'),
  run = require('./run')

module.exports = async (opts) => {
  if (!opts.inputFile) {
    throw new Error('No input file provided.')
  }

  return run(await readCache(opts.inputFile), opts)
}
