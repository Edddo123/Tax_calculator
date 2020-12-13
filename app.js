const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const formRoutes = require('./routes/form')
const db = require('./db')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')))


app.use(formRoutes)
mongoose.connect(
    db.mongoURI
)
.then(result =>{
    
    app.listen(3000)
})
.catch(err=> console.log(err))




