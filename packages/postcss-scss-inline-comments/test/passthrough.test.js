const process = require('./lib/process')

test('Leaves inline comments as is', async () => {
  const input = `
//
// A css comment.
//
`
  expect(await process(input)).toBe(`
//
// A css comment.
//
`)
})

