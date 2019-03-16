const readCache = require('read-cache'),
  run = require('./run')

module.exports = async (opts) => {
  if (!opts.inputfile) {
    throw new Error('No inputfile provided.')
  }

  return run(await readCache(opts.inputfile), opts)
}
