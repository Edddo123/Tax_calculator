import { RequestHandler } from "express"
import jwt from "jsonwebtoken"


export const isAuth:RequestHandler = (req, res, next) => {
    const authHeader = req.get('Authorization')

    if(!authHeader) {
      return  res.redirect('/login')
    }
    const token = authHeader.split(' ')[1]
    let decodedToken
    try{
        decodedToken = jwt.verify(token, 'secret')
    } catch(err) {
        return res.redirect('/login')
    }
    if(!decodedToken) {
        return res.redirect('/login')
    }
    console.log(decodedToken)
    //my property doesnt exist on req object interface so we need to add it
    req.userId = decodedToken.userId
   next()

}