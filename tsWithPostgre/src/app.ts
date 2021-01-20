import express from 'express';
import path from 'path'
import bodyParser from 'body-parser'

import formRoutes from './routes/form'

const app = express()

app.set('view engine', 'ejs');
app.set('views', 'dist/views');
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))



app.use(formRoutes)

app.listen(3001)