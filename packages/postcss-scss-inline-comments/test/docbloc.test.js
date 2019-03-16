const process = require('./lib/process')

test('Converts basic docbloc comment to inline comment', async () => {
  const input = `
/**
 * A css comment.
 */
`
  expect(await process(input)).toBe(`
//
// A css comment.
//
`)
})

test('Converts medium size docbloc comment to inline comment', async () => {
  const input = `
/**
 * A css comment.
 *
 * Another Line.
 */
`
  expect(await process(input)).toBe(`
//
// A css comment.
//
// Another Line.
//
`)
})

test('Converts longform docbloc comment to inline comment', async () => {
  const input = `
/************************************/
/* A css comment.                   */
/************************************/
`
  expect(await process(input)).toBe(`
//*********************************
// A css comment.
//*********************************
`)
})

test('Converts a function docbloc', async () => {
  const input = `
/**
 * Gets a color.
 *
 * @param {String} color
 *   The color name to get.
 *
 * @return {String}
 *   The processed color name.
 */
@function color($color) {
  @return $color;
}
`
  expect(await process(input)).toBe(`
//
// Gets a color.
//
// @param {String} color
//   The color name to get.
//
// @return {String}
//   The processed color name.
//
@function color($color) {
  @return $color;
}
`)
})

test('Converts single asterisk docblocs', async () => {
  const input = `
/*
 * Default Font Family Stacks
 */
`
  expect(await process(input)).toBe(`
//
// Default Font Family Stacks
//
`)
})
