const { execFile } = require('child_process');

test('Shows help message with help flag passed', async () => {
  expect(await new Promise(accept => {
    execFile(__dirname + '/../bin/cli.js', ['-h'], (err, stdout, stderr) => {
      err ? accept(err) : accept(0)
    });
  })).toBe(0)
})
