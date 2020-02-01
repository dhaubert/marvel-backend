const characters = require('./app/routes/characters')
const index = require('./app/routes/index')

module.exports = [
  { route: '/', routerController: index },
  { route: '/characters', routerController: characters },
]
