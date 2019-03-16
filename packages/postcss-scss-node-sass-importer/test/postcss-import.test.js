const postcss = require('postcss'),
  syntax = require('postcss-scss'),
  sassImporter = require('../postcss-scss-node-sass-importer'),
  runner = require('../../../test/lib/test-runner')

test('Finishes before postcss-import starts (single)', async () => {
  const run = runner('postcss-import', [sassImporter({
      importer: (url, prev, done) => {
        done({ file: 'include-this' })
      },
    })
  ])

  await run('single-import')
})

test('Finishes before postcss-import starts (multiple)', async () => {
  const run = runner('postcss-import', [sassImporter({
      importer: (url, prev, done) => {
        done({ file: 'include-' + url })
      },
    })
  ])

  await run('multiple-import')
})

test('Runs on postcss-import imported scss file', async () => {
  const plugin = sassImporter({
    importer: (url, prev, done) => {
      done({ file: 'multi-level.' + url })
    },
  })
  const run = runner('postcss-import', [plugin], true)

  await run('multi-level')
})
