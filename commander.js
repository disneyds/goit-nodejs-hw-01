const { Command } = require('commander')

const program = new Command()

program
  .option('-a, --action <type>', 'Choose action', 'list')
  .option('-i, --id <type>', 'User id')
  .option('-n, --name <type>', 'User name')
  .option('-e, --email <type>', 'User email')
  .option('-p, --phone <type>', 'User phone')

program.parse(process.argv)

const argv = program.opts()

module.exports = { argv }