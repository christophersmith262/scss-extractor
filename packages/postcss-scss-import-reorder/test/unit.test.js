const postcss = require('postcss'),
  reorder = require('../postcss-scss-import-reorder');

test("Reorders imports (rule)", async () => {
  let root = postcss.root()
  root.append({ name: 'import', params: '"a"' })
  root.append({ selector: '.rule' })
  root.append({ name: 'import', params: '"b"' })

  await reorder()(root)

  expect(root.nodes[0].params).toBe('"a"')
  expect(root.nodes[1].params).toBe('"b"')
  expect(root.nodes[2].selector).toBe('.rule')
})

test("Reorders imports (mixin)", async () => {
  let root = postcss.root()
  root.append({ name: 'import', params: '"a"' })
  root.append({ name: 'mixin', params: 'some-function' })
  root.append({ name: 'import', params: '"b"' })

  await reorder()(root)

  expect(root.nodes[0].params).toBe('"a"')
  expect(root.nodes[1].params).toBe('"b"')
  expect(root.nodes[2].params).toBe('some-function')
})

test("Reorders imports (nested)", async () => {
  let root = postcss.root()
  root.append({ selector: '.rule' })
  root.nodes[0].append({ name: 'import', params: '"a"' })
  root.append({ name: 'import', params: '"b"' })

  await reorder()(root)

  expect(root.nodes[0].params).toBe('"a"')
  expect(root.nodes[1].params).toBe('"b"')
  expect(root.nodes[2].selector).toBe('.rule')
})

test("Respects charset", async () => {
  let root = postcss.root()
  root.append({ name: 'charset' })
  root.append({ name: 'import', params: '"a"' })
  root.append({ selector: '.rule' })
  root.append({ name: 'import', params: '"b"' })

  await reorder()(root)

  expect(root.nodes[0].name).toBe('charset')
  expect(root.nodes[1].params).toBe('"a"')
  expect(root.nodes[2].params).toBe('"b"')
  expect(root.nodes[3].selector).toBe('.rule')
})
