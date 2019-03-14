const postcss = require('postcss'),
  dedup = require('../postcss-scss-import-dedup');

test("Removes duplicates", async () => {
  let root = postcss.root()
  root.append({ name: 'import', params: '"a"' })
  root.append({ name: 'import', params: '"b"' })
  root.append({ name: 'import', params: '"a"' })

  await dedup()(root)
  expect(root.nodes.length).toBe(2)
})

test("Removes duplicates with filter", async () => {
  let root = postcss.root()
  root.append({ name: 'import', params: '"a"' })
  root.append({ name: 'import', params: '"b"' })
  root.append({ name: 'import', params: '"a"' })
  root.append({ name: 'import', params: '"b"' })

  await dedup({
    filter: importpath => { return importpath == 'a' },
  })(root)
  expect(root.nodes.length).toBe(3)
})
