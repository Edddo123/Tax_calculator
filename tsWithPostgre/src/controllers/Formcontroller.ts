import {RequestHandler} from 'express';

export const getForms:RequestHandler = (req, res, next) => {
    res.render('main')
}