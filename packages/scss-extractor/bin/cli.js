#!/usr/bin/env node

const argparse = require('argparse'),
  scssExtractor = require('../')

var parser = new argparse.ArgumentParser({
  addHelp: true,
  prog: 'scss-extractor',
  description: `
    Extracts reusable sass components from a shared css library without
    producing any duplicate css code between the shared library and the
    compiled stylesheets that depend on it.
  `
})

parser.addArgument(
  ['inputfile'],
  {
    help: 'The .scss file entrypoint to read',
    metavar: 'INPUTFILE',
  }
)

parser.addArgument(
  ['-e', '--extract'],
  {
    help: 'The list of @rules to extract. Defaults to "mixin,function,import"',
    metavar: 'ATRULES',
  }
)

parser.addArgument(
  ['-d', '--disallow'],
  {
    help: 'The list of to ATRULES to explicitly remove. Defaults to any ATRULE resulting in css output',
    metavar: 'DISALLOW',
  }
)

parser.addArgument(
  ['-i', '--importfilter'],
  {
    help: 'A list of import patterns to aggregate (uses the directory relative to the compiled file)',
    metavar: 'IMPORTFILTER',
    dest: 'importFilter',
  }
)

parser.addArgument(
  ['-s', '--node-sass-importer'],
  {
    help: 'The name of a package containing a node sass importer to use',
    metavar: 'NODESASSIMPORTER',
    dest: 'importer',
  }
)

parser.addArgument(
  ['-f', '--fix-broken-imports'],
  {
    help: 'Removes unresolvable @import statements',
    action: 'storeTrue',
    defaultValue: false,
    dest: 'fixImports',
  }
)

parser.addArgument(
  ['-n', '--normalize-imports'],
  {
    help: 'Collects imports at the top of the generated scss file',
    action: 'storeTrue',
    defaultValue: false,
    dest: 'normalizeImports',
  }
)

scssExtractor.runCli(parser.parseArgs()).then(result => {
  process.stdout.write(result.css)
})
