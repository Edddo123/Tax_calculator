import express from 'express';

import {getSignUp, getLogIn, getCalculator, postCalculator, getPersonVAT, getCorpVAT, getRecords, addPersVAT, addCorpVAT, addIncome} from '../controllers/Formcontroller'

const router = express.Router()

router.get('/signup', getSignUp)

router.get('/login', getLogIn)

router.get('/calculator', getCalculator)

router.post("/postIncomeCalculator", postCalculator)

router.post('/personVAT', getPersonVAT)

router.post('/corpVAT', getCorpVAT)

router.get('/records', getRecords)

router.post('/personVATRecord', addPersVAT)

router.post('/corpVATRecord', addCorpVAT)

router.post('/incomeRecord', addIncome)




export default router;