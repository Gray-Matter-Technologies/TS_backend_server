const mongoose = require('mongoose')


exports.connectToDB = () =>{
  const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
  const coonectString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`

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
  mongoose.connect(coonectString,{ useNewUrlParser: true },{ useUnifiedTopology: true } );


};