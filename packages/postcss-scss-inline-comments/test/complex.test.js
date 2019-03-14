const inliner = require('../../postcss-scss-inline-comments'),
  run = require('../../../test/lib/test-runner')('complex', [inliner])

test('Handles complex nesting', async () => {
  await run('complex-nesting')
})

test('Handles different whitespace orientations', async () => {
  await run('whitespace')
})
