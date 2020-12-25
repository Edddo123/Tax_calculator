const express = require('express')

const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const formRoutes = require('./routes/form')
const db = require('./db')

const app = express()







app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')))



app.use(formRoutes)

app.use((err, req, res, next) => {
  res.status(500).render('500', {
    
  });
})

mongoose.connect(
    db.mongoURI
)
.then(result =>{
  const server =  app.listen(3000)
 const io = require('./socket').init(server)  

 
})
.catch(err=> console.log(err))







