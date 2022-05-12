const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require("cors")
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const { checkAuth,verifyAuth } = require('./middleware/auth.middleware');
require('./config/db/index')
require('dotenv').config();


app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    'allowedHeaders':['sessionId','content-type'],
    'exposedHeaders':['sessionId'],
    'methods':'GET,HEAD,POST,PUT,PATCH,DELETE',
    'preflightContinue':false
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

app.get('*',checkAuth)
app.get('/verifier/session',verifyAuth)
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);


app.listen(process.env.PORT,()=>{
    console.log('Ouvert sur le port '+process.env.PORT);
})