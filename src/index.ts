require('dotenv').config();
import express from 'express';

const { connectToDB } = require('./utils/db')

import './controller/LoginController';
import './controller/account';
import './controller/login';
import './controller/task';
import './controller/user';


import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import router from './router';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json'

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

connectToDB();


app.use(router);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(7001, () =>{
 
})