const mongoose = require('mongoose')


exports.connectToDB = () =>{
  const { FULL_CONNECTION_STRING, DB_HOST, DB_PORT, DB_DATABASE } = process.env;
  const connectString = FULL_CONNECTION_STRING || `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

  console.log(connectString);

  const db = mongoose.connection;
  db.on('connected', () =>{
    console.log('DB connected');
  });
  db.on('error', (error:any) =>{
    console.log('failed');
    console.error(error.message);
    process.exit(1);
  });
  db.on('disconnected', () =>{
    console.log('disconnected');
  });
  mongoose.connect(connectString,{ useNewUrlParser: true },{ useUnifiedTopology: true } );


};
