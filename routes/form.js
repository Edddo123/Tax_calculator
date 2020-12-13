const express = require('express')

const router = express.Router()

const formController = require('../controller/form')

router.get('/', formController.getForm)

router.put('/persnInc', formController.persnInc)

module.exports = router