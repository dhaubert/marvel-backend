const express = require('express')

const router = express.Router()

const characters = require('../controllers/http/characters')

router.get('/', characters.index)
// router.get('/:id', characters.show)
// router.post('/', characters.store)
// router.put('/:id', characters.update)
// router.delete('/', characters.destroy)

module.exports = router
