import express from 'express';

import {getSignUp, getLogIn, getCalculator, postCalculator, getPersonVAT, getCorpVAT, getRecords, addPersVAT, addCorpVAT, addIncome, postSignUp, postLogin} from '../controllers/Formcontroller'
import { isAuth } from "../middleware/isAuth"

const router = express.Router()

router.get('/signup', getSignUp)

router.get('/login', getLogIn)

router.get('/calculator',  getCalculator)

router.post("/postIncomeCalculator", postCalculator)

router.post('/personVAT',  getPersonVAT)

router.post('/corpVAT',  getCorpVAT)

router.get('/records', isAuth, getRecords)

router.post('/personVATRecord',  addPersVAT)

router.post('/corpVATRecord', isAuth, addCorpVAT)

router.post('/incomeRecord', isAuth, addIncome)

router.post('/postsignup', postSignUp)

router.post('/postlogin', postLogin)




export default router;