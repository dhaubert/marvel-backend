const express = require('express')

const router = express.Router()

const index = require('../controllers/http/index')

router.get('/', index.index)

module.exports = router
