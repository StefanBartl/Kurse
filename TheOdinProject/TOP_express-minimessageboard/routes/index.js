var express = require('express');
var router = express.Router();


//#region pre-created messages

const messages = [
  {
    text: "Hi there! I want to say, that programming webservers makes fun!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Wow, so much learn and it never stops....!",
    user: "Charles",
    added: new Date()
  },
  {
    text: "Everytime i've learned something new and it works later in projects, im so happy!",
    user: "WKD",
    added: new Date()
  }
];

//#endregion


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});


router.get('/new', function(req, res, next){
  res.render('form');
});

router.post('/new', function(req, res, next){
  messages.push({text: req.body.messageText, user: req.body.messageUser, added: new Date()});
  res.redirect('/');
});

module.exports = router;
