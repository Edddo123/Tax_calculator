const express = require('express')

const router = express.Router()

const formController = require('../controller/form')

router.get('/', formController.getForm)

router.put('/persnInc', formController.persnInc)

router.put('/totalVAT', formController.totalVAT)

module.exports = router