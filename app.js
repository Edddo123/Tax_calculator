const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const formRoutes = require('./routes/form')

app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')))


app.use(formRoutes)



app.listen(3000)

