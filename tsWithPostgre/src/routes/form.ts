import express from 'express';

import {getForms} from '../controllers/Formcontroller'

const router = express.Router()

router.get('/', getForms)


export default router;