const run = require('./lib/test-runner')('npm-sass')

test('Uses npm-sass importer to import a single module scss file', async () => {
  await run('single-include')
})

test('Uses npm-sass importer to import nested module scss files', async () => {
  await run('nested-includes')
})

test('Uses npm-sass importer to import nested module scss files with a filter', async () => {
  await run('filtered-include', {
    importFilter: '^node_modules/b-package',
  })
})
