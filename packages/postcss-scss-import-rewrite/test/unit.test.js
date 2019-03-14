const postcss = require('postcss'),
  rewrite = require('../postcss-scss-import-rewrite')

async function testrewrite(importpath, mutator, expected) {
  let root = postcss.root()
  root.append({ name: 'import', params: importpath })
  await rewrite({ mutator: mutator })(root)
  expect(root.nodes[0].params).toBe(expected)
}

test("Throws exception with no mutator", async () => {
  expect(rewrite).toThrow()
})

test("Rewrites single import path (single quote)", async () => {
  await testrewrite("'testpath.scss'", async importpath => {
    return 'mutator(' + importpath + ')'
  }, "'mutator(testpath.scss)'")
})

test("Rewrites single import path (double quote)", async () => {
  await testrewrite('"testpath.scss"', async importpath => {
    return 'mutator(' + importpath + ')'
  }, '"mutator(testpath.scss)"')
})

test("Rewrites single import path (expression)", async () => {
  await testrewrite('test-function("teststring")', async importpath => {
    return 'mutator(' + importpath + ')'
  }, 'mutator(test-function("teststring"))')
})

test("Skips rewrite on undefined return (async)", async () => {
  await testrewrite('teststring', async importpath => {}, 'teststring')
})

test("Skips rewrite on undefined return (sync)", async () => {
  await testrewrite('teststring', importpath => {}, 'teststring')
})

test("Test synchronous rewrite", async () => {
  await testrewrite('"testpath.scss"', importpath => {
    return 'mutator(' + importpath + ')'
  }, '"mutator(testpath.scss)"')
})
