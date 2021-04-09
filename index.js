const { argv } = require('./commander')
const { invokeActions } = require('./invokeActions')

invokeActions(argv)