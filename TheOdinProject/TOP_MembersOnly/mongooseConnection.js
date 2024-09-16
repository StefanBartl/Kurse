const mongoose = require('mongoose');

//Set up default mongoose connection
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
