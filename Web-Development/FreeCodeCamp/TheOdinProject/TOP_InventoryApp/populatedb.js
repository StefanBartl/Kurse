#! /usr/bin/env node

console.log('This script populates some test guitars, amps and stuff to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/ 
var async = require('async')

var Guitar = require('./models/guitar')
var GuitarInstance = require('./models/guitarInstance')

var Category = require('./models/categories')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categoriess = []
var guitars = []
var guitarInstances = []


function categoriesCreate(name, cb) {
  var categories = new Category({ name: name });
       
  categories.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + categories);
    categoriess.push(categories)
    cb(null, categories);
  }   );
}

function guitarCreate(name, manufactor, description, price, category, cb) {
  guitardetail = { 
    name: name,
    description: description,
    price: price,
    manufactor: manufactor,
  }
  if (category != false) guitardetail.category = category
    
  var guitar = new Guitar(guitardetail);    
  guitar.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Guitar: ' + guitar);
    guitars.push(guitar)
    cb(null, guitar)
  }  );
}
    

function guitarInstanceCreate(guitar, imprint, due_back, status, cb) {
  guitarinstancedetail = { 
    guitar: guitar,
    imprint: imprint
  }    
  if (due_back != false) guitarinstancedetail.due_back = due_back
  if (status != false) guitarinstancedetail.status = status
    
  var guitarInstance = new GuitarInstance(guitarinstancedetail);    
  guitarInstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING GuitarInstance: ' + guitarInstance);
      cb(err, null)
      return
    }
    console.log('New GuitarInstance: ' + guitarInstance);
    guitarInstances.push(guitarInstance)
    cb(null, guitar)
  }  );
}


function createCategories(cb) {
    async.series([
        function(callback) {
          categoriesCreate("Digital", callback);
        },
        function(callback) {
          categoriesCreate("Gibson", callback);
        },
        function(callback) {
          categoriesCreate("Les Paul", callback);
        },
        ],
        // optional callback
        cb);
}


function createGuitars(cb) {
    async.parallel([
      function(callback) {
        guitarCreate('Les Paul Fernando', 'Epiphone', 'Nice golden LP', 239, 'Les Paul', 11, callback);
      },
      function(callback) {
        guitarCreate('Telecaster 3FF', 'Gibson', 'Blue oldie Strat', 449, 'Telecaster', 2, callback);
      },
      function(callback) {
        guitarCreate('Digital LOL999', 'Native', 'Modern art guitar', 1239, 'Digital', 16, callback);
      },
      function(callback) {
        guitarCreate('Huarara', 'Les Paul', 'Green shiny deck', 739, 'Les Paul', 11, callback);
      },
        ],
        // optional callback
        cb);
}


function createBookInstances(cb) {
    async.parallel([
        function(callback) {
          guitarInstanceCreate(guitars[0], 'London Gollancz, 2014.', false, 'Available', callback)
        },
        function(callback) {
          guitarInstanceCreate(guitars[1], ' Gollancz, 2011.', false, 'Loaned', callback)
        },
        function(callback) {
          guitarInstanceCreate(guitars[2], ' Gollancz, 2015.', false, false, callback)
        },
        function(callback) {
          guitarInstanceCreate(guitars[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          guitarInstanceCreate(guitars[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          guitarInstanceCreate(guitars[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          guitarInstanceCreate(guitars[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
        },
        function(callback) {
          guitarInstanceCreate(guitars[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
        },
        function(callback) {
          guitarInstanceCreate(guitars[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
        },
        function(callback) {
          guitarInstanceCreate(guitars[0], 'Imprint XXX2', false, false, callback)
        },
        function(callback) {
          guitarInstanceCreate(guitars[1], 'Imprint XXX3', false, false, callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createCategories,
    createGuitars,
    createBookInstances
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+guitarInstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



