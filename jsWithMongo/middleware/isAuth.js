const jwt = require('jsonwebtoken');


module.exports = (req, res, next) =>{
  
    const authHeader = req.get('Authorization') || req.query.tok
 
   
    if (!authHeader) {
      return  res.redirect('/getLogin')
      } 
      const token = authHeader.split(' ')[1]
   
      
      let decodedToken
      try {
        decodedToken = jwt.verify(token, 'secret');
      } catch (err) {
        return  res.redirect('/getLogin')
      }
      if (!decodedToken) {
        return  res.redirect('/getLogin')
      }
      
      req.userId = decodedToken.userId;
      
      next();
    };

