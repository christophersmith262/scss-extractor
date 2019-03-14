const process = require('./lib/process')


test('Handles nesting inside rule', async () => {
  expect(await process(".rule { /* A css comment. */ }")).toBe(
`.rule { // A css comment.
}`)
})

test('Handles nesting inside rule (spaceless)', async () => {
  expect(await process(".rule{/* A css comment.*/}")).toBe(
`.rule{// A css comment.
}`)
})

test('Handles rule with left-adjacent declaration', async () => {
  expect(await process(".rule { color: red; /* A css comment. */ }")).toBe(
`.rule { color: red; // A css comment.
}`)
})

test('Handles rule with left-adjacent declaration (spaceless)', async () => {
  expect(await process(".rule{color:red;/* A css comment. */}")).toBe(
`.rule{color:red;// A css comment.
}`)
})

test('Handles rule with right-adjacent delcaration', async () => {
  expect(await process(".rule { /* A css comment. */ color: red; }")).toBe(
`.rule { // A css comment.
color: red; }`)
})

test('Handles rule with right-adjacent delcaration (spaceless)', async () => {
  expect(await process(".rule{/* A css comment. */color:red;}")).toBe(
`.rule{// A css comment.
color:red;}`)
})

test('Handles nested, indented comment', async () => {
  expect(await process(`.rule {
  /* A css comment.*/
}`)).toBe(
`.rule {
  // A css comment.
}`)
})
