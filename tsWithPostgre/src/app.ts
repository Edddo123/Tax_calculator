import express from 'express';
import path from 'path'

import formRoutes from './routes/form'

const app = express()

app.set('view engine', 'ejs');
app.set('views', 'dist/views');

app.use(express.static(path.join(__dirname, 'public')))



app.use(formRoutes)

app.listen(3000)