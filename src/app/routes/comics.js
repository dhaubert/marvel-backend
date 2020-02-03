const express = require('express')

const router = express.Router()

const comics = require('../controllers/http/comics')
const pagination = require("../middlewares/pagination");

router.get('/', pagination, comics.index)
router.get('/:id', comics.show)
// router.post('/', comics.store)
// router.put('/:id', comics.update)
// router.delete('/', comics.destroy)

module.exports = router
