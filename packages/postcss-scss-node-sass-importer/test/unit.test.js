const postcss = require('postcss'),
  sassImporter = require('../postcss-scss-node-sass-importer')

test("Throws exception with no importer", async () => {
  expect(sassImporter).toThrow()
})

test("Respects fixBroken = false", async () => {
  let root = postcss.root()
  root.append({ name: 'import', params: '"a"' })

  await sassImporter({
    importer: (url, prev, done) => { done(url) },
  })(root)

  expect(root.nodes.length).toBe(1)
})

test("Respects fixBroken = true", async () => {
  let root = postcss.root()
  root.append({ name: 'import', params: '"a"' })

  await sassImporter({
    importer: (url, prev, done) => { done(url) },
    fixBroken: true,
  })(root)

  expect(root.nodes.length).toBe(0)
})

test("Respects importFilter", async () => {
  let root = postcss.root()
  root.append({ name: 'import', params: '"a"' })
  root.append({ name: 'import', params: '"b"' })

  await sassImporter({
    importer: (url, prev, done) => { done({ file: 'switched' }) },
    resolver: (sourcepath, importpath, targetpath) => { return targetpath },
    filter: (sourcepath, importpath, targetpath) => { return importpath == 'a' }
  })(root)

  expect(root.nodes[0].params).toBe('"switched"')
  expect(root.nodes[1].params).toBe('"b"')
})
