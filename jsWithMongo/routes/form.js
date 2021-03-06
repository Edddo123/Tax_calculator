const express = require('express')
const isAuth = require('../middleware/isAuth')
const { body } = require('express-validator');

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


router.post('/postSignup',[
    body('email', 'invalid email').isEmail().trim(),
    body('username').isString().isLength({ min: 5 }),
    body('password', 'password has to be at least 5 char long').isLength({ min: 5 })
    .isAlphanumeric()
    .trim()

], formController.postSignup)

router.post('/postLogin', formController.postLogin)

router.get('/getPosts', formController.getPosts)

router.post('/addPost', isAuth, formController.addPost)

router.delete('/deletePost/:postId',isAuth, formController.deletePost)

router.delete('/deleteRecord/:recordId',isAuth, formController.deleteRecord)



module.exports = router