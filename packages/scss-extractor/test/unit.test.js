const run = require('./lib/test-runner')('basic'),
  api = require('../index')

test('Handles basic constructs', async () => {
  await run("single")
})

test('Does not normalize imports by default', async () => {
  await run("no-normalize", { importFilter: /missing/ })
})

test('Respects normalizeImports=true', async () => {
  await run("normalize", { importFilter: /missing/, normalizeImports: true })
})

test('runCli errors if inputfile missing', async () => {
  await expect(api.runCli({})).rejects.toEqual(
    new Error('No input file provided.')
  )
})

test('Direct run works without opts', async () => {
  const result = await api.run('/* Comment */ @mixin a-mixin { }')
  
  expect(result.css).toEqual(`// Comment
@mixin a-mixin { }`)
})
