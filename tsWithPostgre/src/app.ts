import express from 'express';
import path from 'path'
import bodyParser from 'body-parser'
import db from './util/db-setup'

import formRoutes from './routes/form'

const app = express()

app.set('view engine', 'ejs');
app.set('views', 'dist/views');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, 'public')))



app.use(formRoutes)

db.connect()
.then(()=> {
    console.log('connected to database')
    app.listen(3001)
})
.catch((err)=> {
    console.log(err, 'system crashed')
})

