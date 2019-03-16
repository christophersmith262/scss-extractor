const run = require('./lib/test-runner')('comments')

test('Converts comments by default', async () => {
  await run("comment")
})
