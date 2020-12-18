const express = require('express')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

const formController = require('../controller/form')


router.get('/',formController.getMain)

router.get('/form',isAuth, formController.getForm)

router.put('/persnInc',isAuth,formController.persnInc)

router.put('/totalVAT',isAuth, formController.totalVAT)

router.post('/recordsVAT', isAuth, formController.postRecordsVAT)

router.post('/recordsInc',isAuth,  formController.postRecordsInc)

router.get('/records', isAuth,  formController.getRecords)

router.get('/getSign', formController.getAuth)

router.get('/getLogin', formController.getLogin)

router.post('/postLogout', formController.postLogout)


router.post('/postSignup', formController.postSignup)

router.post('/postLogin', formController.postLogin)

router.get('/getPosts', formController.getPosts)

router.post('/addPost', isAuth, formController.addPost)


module.exports = router