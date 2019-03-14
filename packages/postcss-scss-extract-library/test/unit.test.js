const extractor = require('../postcss-scss-extract-library'),
  run = require('../../../test/lib/test-runner')('root', [extractor], true)

/** At Root Level **/

test('Keep whitelisted root level @rules', async () => {
  await run('whitelist-at-root')
})

test('Keep graylisted root level @rules', async () => {
  await run('graylist-at-root')
})

test('Remove blacklisted root level @rules', async () => {
  await run('blacklist-at-root')
})

test('Keep root level variables', async () => {
  await run('variables-at-root')
})

test('Remove root level rules', async () => {
  await run('rules-at-root')
})

/** Nested in Root Whitelist **/

test('Keep whitelisted @rules nested in root whitelisted @rules', async () => {
  await run('whitelist-in-whitelist')
})

test('Keep graylisted @rules nested in root whitelisted @rules', async () => {
  await run('graylist-in-whitelist')
})

test('Keep blacklisted @rules nested in root whitelisted @rules', async () => {
  await run('blacklist-in-whitelist')
})

test('Keep variables nested in root whitelisted @rules', async () => {
  await run('variables-in-whitelist')
})

test('Keep rules nested in root whitelisted @rules', async () => {
  await run('rules-in-whitelist')
})

/** Nested in Root Graylist **/

test('Keep whitelisted @rules nested in root graylisted @rules', async () => {
  await run('whitelist-in-graylist')
})

test('Keep graylisted @rules nested in root graylisted @rules', async () => {
  await run('graylist-in-graylist')
})

test('Remove blacklisted @rules nested in root graylisted @rules', async () => {
  await run('blacklist-in-graylist')
})

test('Keep variables nested in root graylisted @rules', async () => {
  await run('variables-in-graylist')
})

test('Remove rules nested in root graylisted @rules', async () => {
  await run('rules-in-graylist')
})
