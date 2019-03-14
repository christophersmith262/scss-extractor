#!/usr/bin/env node

const argparse = require('argparse'),
  scssExtractor = require('../')

var parser = new argparse.ArgumentParser({
  addHelp: true,
  description: 'Extracts parts of an SCSS file to generate a new SCSS partial.',
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
    help: 'The list of to ATRULES to explicitly remove',
    metavar: 'DISALLOW',
  }
)

parser.addArgument(
  ['-i', '--importfilter'],
  {
    help: 'A list of package patterns to include (will not be expanded)',
    metavar: 'IMPORTFILTER',
    dest: 'importFilter',
  }
)

parser.addArgument(
  ['-n', '--node-sass-importer'],
  {
    help: 'The name of a package containing a node sass importer to use',
    metavar: 'NODESASSIMPORTER',
    dest: 'importer',
  }
)

parser.addArgument(
  ['-f', '--fix-imports'],
  {
    help: 'Removes unresolvable @import statements',
    action: 'storeTrue',
    defaultValue: false,
    dest: 'fixImports',
  }
)

parser.addArgument(
  ['-c', '--skip-comments'],
  {
    help: 'Prevents comments from being inlined'
    action: 'storeTrue',
    defaultValue: false,
    dest: 'skipComments',
  }
)

scssExtractor.run(parser.parseArgs()).then(result => {
  process.stdout.write(result.css)
})
