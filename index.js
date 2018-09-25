const Router = require('router')
const finalhandler = require('finalhandler')
const jwt = require('express-jwt')
const handleUnauthorized = require('./lib/handle-unauthorized')
const { JWT_SECRET } = require('./config')
const handler = require('./lib/handler')

const router = Router()

// JWT
router.use(jwt({ JWT_SECRET }).unless({ path: ['/'] }))
router.use(handleUnauthorized)

// ROUTES
router.get('/', handler.getFrontpage)
router.get('/kontaktinformasjon/:fnr', handler.getKontaktinformasjon)
router.post('/kontaktinformasjon', handler.getKontaktinformasjon)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
