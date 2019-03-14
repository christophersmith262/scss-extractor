module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "packages/**/*.js",
    "!**/test/lib/*.js",
  ],
  roots: [
    'packages/',
  ],
};
