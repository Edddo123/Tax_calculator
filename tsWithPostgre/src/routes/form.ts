import express from 'express';

import {getSignUp, getLogIn, getCalculator, postCalculator, getPersonVAT, getCorpVAT} from '../controllers/Formcontroller'

const router = express.Router()

router.get('/signup', getSignUp)

router.get('/login', getLogIn)

router.get('/calculator', getCalculator)

router.post("/postIncomeCalculator", postCalculator)

router.post('/PersonVAT', getPersonVAT)

router.post('/CorpVAT', getCorpVAT)



export default router;