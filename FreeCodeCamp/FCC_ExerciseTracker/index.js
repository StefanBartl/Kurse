// set up node.js / express replit
const express = require('express'), app = express(), bodyParser = require('body-parser'), mongoose = require('mongoose'), cors = require('cors'), User = require('./models/userModel'), Exercise = require('./models/exerciseModel');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(cors());
app.use(express.static('public'));

// mongodb connection
mongoose.connect(`${process.env['MONGODB']}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

//=======================================================
// Solution start

// GET userlist
app.get('/api/users', function(req, res) {
  User.find({}, (error, data) => {
    res.status(200).json(data);
  });
});

//  POST to create a new user
app.post('/api/users', function(req, res){

  User.findOne({username: req.body.username}, (error, data) => {

    // error handling
    if (error) {
      res.status(500).send("'Create user' error");
      return console.log(error);
    };
    // if no username ist saved in db, create new User Model object
    if (!data) { 
        const newUser = new User({
        username: req.body.username
      });
      // save new user to db      
      newUser.save((error, data) => {
        // error handling
        if (error) return console.log(error);
        // create user object for response
        const savedUser = {
          "username": data.username, 
          "_id": data._id
        };
        res.status(200).json(savedUser);
        console.log(savedUser);
      });
      // if username already exists in db...
    } else { 
      res.status(200).send(`Username ${req.body.username} already exists.`);
    };
  });
});


// POST to add new exercises...
app.post('/api/users/:_id/exercises', function(req, res){

  // get POST data
  const userID = req.body[":_id"] || req.params._id,
        exerciseDescription = req.body.description,
        exerciseDuration = req.body.duration,
        exerciseDate = req.body.date;
  // validate to undefiined
  if (!userID || !exerciseDescription || !exerciseDuration) {
    res.status(500).json("Fields _id, description & duration are required to add new exercises.");
    return;
  };

  // get/find user in db
  User.findOne({"_id": userID}, (error, data) => {
    
    // Catch: user id error handling
    if (error || !data) {
      res.status(500).json("Unknown userID - no match in DB.");
      return console.log(error);
    };
    // If userID matched in db...
    if(data){
      // create new exercise Model
      const newExercise = new Exercise({
        username: data.username,
        description: exerciseDescription,
        duration: exerciseDuration
      });
      // if date is passed, use it. if no, Model.date default is Date.now
      if (exerciseDate) {
        newExercise.date = exerciseDate;
      };
      // save new exercise to User
      newExercise.save((error, data) => {
        if (error) return console.log(error);

        // gather informations for response in obj
        const returnObj = {
          "_id": userID,
          "username": data.username,
          "date": data.date.toDateString(),
          "duration": data.duration,
          "description": data.description
        };

        res.status(200).json(returnObj);
      });
    };
  });
});

// GET to deliver logs for user
app.get('/api/users/:_id/logs', function(req, res){
  
  const userID = req.body["_id"] || req.params._id,
        from = req.query.from,
        to = req.query.to,
        limit = req.query.limit;

  // validate user input
  if (from) {
    from = new Date(from);
    if (from == "Invalid Date") {
      res.status(500).json("Invalid 'from' Date");
      return;
    };
  } else  if (to) {
    to = new Date(to);
    if (to == "Invalid Date") {
      res.status(500).json("Invalid 'to' Date");
      return;
    };
  } else if (limit) {
    limit = parseInt(limit);
    if (isNaN(limit)) {
      res.json("Invalid 'Limit'");
      return;
    };
  };

  // get user in db
  User.findOne({ "_id" : userID }, (error, data) => {

    // Catch: user id error
    if (error || !data) {
      res.status(500).json("Incorrect UserID");
      return
    } else {

      // get correct search paramters:
      // init onjects
      const objToReturn = { "_id" : userID, "username" : data.username}, searchObj = { "username" : data.username }; dateSearchObj = {};

      // Info: db search operators: from => $gte grater than equal, to => $lt less than    
      
      // if from was passed..
      if (from) {
        // ....from 'value' is the passed string value....
        objToReturn.from = from.toDateString();
        // ...and as search operator we have the grather than equal propertie with the the from value
        dateSearchObj["$gte"] = from;
        // if there is a also a 'to' passed
        if (to) {
          // same as above
          objToReturn.to = to.toDateString();
          // but search operator for to is less than equal
          dateSearchObj["$lt"] = to;
        } else {
          // if no 'to' passed, we search till now
          dateSearchObj["$lt"] = Date.now();
        }
      }

      // if only 'to' was passed...
      if (to) {
        objToReturn.to = to.toDateString();
        dateSearchObj["$lt"] = to;
        // as search value for the gte operator we pass a date many years ago
        dateSearchObj["$gte"] = new Date("2000-01-01");
      };

      // add code from above to the search obj, which we will use to search      
      if (to || from) {
        searchObj.date = dateSearchObj;
      };

      // Search and count in given user object with the exercise Model
      Exercise.count(searchObj, (error, data) => {
        
        if (error || !data) {
          res.status(500).json("Invalid Date to search in exercise log");
          return
        };
  
        let exerciseCounter = data;
        
        //  set exercise counter to passed limit if setted
        if (limit) {
          if(limit < exerciseCounter){
              exerciseCounter = limit;
          };
        };
        // set count in the return object
        objToReturn["count"] = exerciseCounter;

        // search in userObj with exercise Model...
        Exercise.find(searchObj, (error, data) => {

          // Catch error
          if (error || !data) return console.log(error);
  
          // init variables
          let logArray = [], exerciseObj = {}, counter = 0;

          // loop trough the returned exerciese data to finish log
          data.forEach(function(val) {
            // increase counter 
            counter += 1;
            if (!limit || counter <= limit) {
              // create new obj, pass data to correct properties and push it to the log array
              exerciseObj = {};
              exerciseObj.description = val.description;
              exerciseObj.duration = val.duration;
              exerciseObj.date = val.date.toDateString();
              logArray.push(exerciseObj);
            };
          });
          
          // add finished log to obj and returm it
          objToReturn.log = logArray;
          res.status(200).json(objToReturn);
        });
      });
    };
  });
});


// Solution end
//=======================================================


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})