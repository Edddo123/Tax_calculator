const express = require('express')

const router = express.Router()

const formController = require('../controller/form')

router.get('/', formController.getForm)

router.put('/persnInc', formController.persnInc)

router.put('/totalVAT', formController.totalVAT)

router.post('/recordsVAT', formController.postRecordsVAT)

router.post('/recordsInc', formController.postRecordsInc)


router.get('/records', formController.getRecords)

module.exports = router