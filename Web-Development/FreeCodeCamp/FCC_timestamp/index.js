const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const timestamp = require('unix-timestamp');

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.static('public'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get('/api/hello', function (req, res) {
  res.json({greeting: 'hello API'});
});
//!=============================================


app.get('/api', function(req, res){

  res.json({
    unix: new Date(Date.now()).valueOf(),
    utc: new Date(Date.now()).toUTCString()
  });

});

app.get('/api/:date', function(req, res){

// check user date for unix timestamp, than create correct Date() 
const unixRegex = /\d\d\d\d\d\d\d\d\d\d\d\d\d/;
unixRegex.test(req.params.date)
  ? userDate = new Date(timestamp.toDate(parseInt(req.params.date / 1000)))
  : userDate = new Date(req.params.date);

// check invalid date
(userDate instanceof Date && !isNaN(userDate) === false)
  ? res.send({ error : "Invalid Date" })
  : res.json({ // else  response
      unix: userDate.valueOf(),
      utc: userDate.toUTCString()
    });

});


//!=============================================
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
