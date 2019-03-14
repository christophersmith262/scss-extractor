const postcss = require('postcss'),
  syntax = require('postcss-scss'),
  rewrite = require('../postcss-scss-import-rewrite')

async function testmutation(mutator, input, expected) {
  const result = await postcss([rewrite({ mutator: mutator })])
    .process(input, { syntax: syntax, from: undefined })
  expect(result.css).toBe(expected)
}

test('Mutates import', async () => {
  await testmutation(async importpath => {
    return 'mutated(' + importpath + ')'
  }, "@import 'test.scss';", "@import 'mutated(test.scss)';")
})

test('Mutates multiple imports', async () => {
  await testmutation(async importpath => {
    return 'mutated(' + importpath + ')'
  },
`
@import 'test1.scss';
@import 'test2.scss';
@import 'test3.scss';
@import 'test4.scss';
@import 'test5.scss';
@import 'test6.scss';
@import 'test7.scss';
@import 'test8.scss';
@import 'test9.scss';
@import 'test10.scss';
`,
`
@import 'mutated(test1.scss)';
@import 'mutated(test2.scss)';
@import 'mutated(test3.scss)';
@import 'mutated(test4.scss)';
@import 'mutated(test5.scss)';
@import 'mutated(test6.scss)';
@import 'mutated(test7.scss)';
@import 'mutated(test8.scss)';
@import 'mutated(test9.scss)';
@import 'mutated(test10.scss)';
`)
})
