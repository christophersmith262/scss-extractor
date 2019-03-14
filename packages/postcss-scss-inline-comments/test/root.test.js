const process = require('./lib/process')

test('Converts single line comment to an inline comment', async () => {
  expect(await process("/* A css comment. */")).toBe("// A css comment.")
})

test('Converts single line comment to an inline comment with left-adjacent rule', async () => {
  expect(await process(".rule { color: red; } /* A css comment. */")).toBe(".rule { color: red; } // A css comment.")
})

test('Converts single line comment to an inline comment with right-adjacent rule', async () => {
  expect(await process("/* A css comment. */ .rule { color: red; }")).toBe(`// A css comment.
.rule { color: red; }`)

})

test('Converts single line comment to an inline comment with adjacent mixins', async () => {
  expect(await process("@mixin test1 {}; /* A css comment. */ @mixin test2 {}")).toBe(`@mixin test1 {}; // A css comment.
@mixin test2 {}`)
})
