try {
  require('dotenv').config();
} catch (e) {}
import express from 'express';
const cors = require('cors')

const { connectToDB } = require('./utils/db')
const { PORT } = process.env;

import './controller/account';
import './controller/login';
import './controller/task';
import './controller/user';
import './controller/upload'
import './controller/map'
import './controller/notification';

import errorHandler from "errorhandler";
import bodyParser from 'body-parser';
import router from './router';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json'


const app = express();
app.set("port", PORT || '7001');
app.use(express.static('public'));



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connectToDB();
app.use(cors());

app.use(router);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler())
}
export default app;
