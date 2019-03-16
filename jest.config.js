module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "packages/**/*.js",
    "!**/test/lib/*.js",
    "!**/bin/*.js",
  ],
  roots: [
    'packages/',
  ],
};
