require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const validator = require('validator');
const validUrl = require('valid-url');
const crypto = require("crypto");

// setup mongoose mongodb
const mongoose = require("mongoose");
const { Schema } = mongoose;

// connect mongoose mongodb
mongoose.connect(`${process.env.MONGODB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Basic Configuration
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


//=============================
// Solution start

// get mongoose mongodb collection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongodDB error:"));
db.once("open", function () {
  console.log("MongoDB connected");
});

// setup mongoose mongodb schema and model
const urlSCHEME = new Schema({
  original_url: String,
  short_url: String,
});
const ShortUrl = mongoose.model("ShortUrl", urlSCHEME);

// Validate url from POST body and send response... 
app.post('/api/shorturl', async function(req, res){
   
  // create random url and shorten it
  let newRandomUUID = crypto.randomUUID();
  // Use first 5 for ID
  let newID = newRandomUUID.substring(0, 5);
  
  // set up regex test
  const passedUrl = req.body.url;
  const testRegExp = /^https?:\/\//;

  // first check for valid url
  if(!validUrl.isUri(passedUrl) || !testRegExp.test(passedUrl)){
    console.log({ error: 'invalid url' });
    res.json({ error: 'invalid url' });
  } else {
      // try to get response from db
      try{
        // Try to find the passed url in db
        let urlDB = await ShortUrl.findOne({original_url: req.body.url});
        if(!urlDB){// if not found in db....
          //  create a new model with given url
          urlDB = new ShortUrl({original_url: req.body.url, short_url: `${newID}`});
          // save to db
          await urlDB.save();
          // response to user
          res.status(200).json({original_url: urlDB.original_url, short_url: urlDB.short_url});
        } else { // if found in db...
          // response to user
          res.status(200).json({original_url: urlDB.original_url, short_url: urlDB.short_url});
        };
      } catch (error){
        // if no response from db
        console.log(error);
        res.status(500).send('No connection to Mongo DB! (Mongoose)');
      };
  };

});

// Redirect to shorturl
app.get('/api/shorturl/:shorturl', async function(req, res){

  // try to get a connection with mongo db
  try{
    // Try to get url from db
    let urlToRedirect = await ShortUrl.findOne({short_url: req.params.shorturl});

    urlToRedirect
      ? res.status(301).redirect(urlToRedirect.original_url) // redirect if success
      : res.status(404).send('Invalid shorturl to querie db.'); // response error if shorturl was not found
    return;
  } catch (error){ // if no conection to db...
      // if no response from db
      res.status(500).send('No connection to Mongo DB! (Mongoose)');
      return;
  };  

});

// Solution end
//=============================


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
