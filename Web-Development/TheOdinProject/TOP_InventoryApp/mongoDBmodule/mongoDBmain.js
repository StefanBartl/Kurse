// Get required modules
const MongoClient = require('mongodb').MongoClient;
const { allValidCommands } = require('./mongooseCommands'); // Get sure: correct path?

async function DoMongoDB(database, collection, command, commandObject){
   //Argument validation
   if(typeof database === 'undefined')return console.error(`Argument 'database' must be passed.`);
   if(typeof collection === 'undefined')return console.error(`Argument 'collection' must be passed.`);
   if(typeof database !== 'string')return console.error(`Argument 'database' must be from type 'string', but ${typeof database} was passed.`);
   if(typeof collection !== 'string')return console.error(`Argument 'collection' must be from type 'string', but ${typeof collection} was passed.`);
   if(typeof command !== 'string')return console.error(`Argument 'command' must be from type 'string', but ${typeof collection} was passed.`);
   if(allValidCommands.find(index => index === command) === undefined)return console.error(`Argument 'command' must bea valid MongoDB/mongoose command.`);
   if(typeof commandObject !== 'object')return console.error(`Argument 'command' must be from type 'object', but ${typeof collection} was passed.`);
 
   // Execution
   try{
     let db, collectionInDB;
     // Connect to MongoDB
     client = await MongoClient.connect(process.env.MONGODB, {useNewUrlParser: true});
     // Get correct database
     db = client.db(database);
 
     // Get correct collection
     collectionInDB = db.collection(collection);
     
     // Get result
     result = await collectionInDB[command](commandObject);   
     
     //
     console.log(result);
     return;
   }
   catch(error){ console.error(error); } // catch some mongoDB error
   finally{ client.close(); }; // close the connection
  };
 
  module.exports = { DoMongoDB };
  
// Example:
// DoMongoDB('TOP','Inventory-App', 'findOne', {_test: 'WKD Teststring'});