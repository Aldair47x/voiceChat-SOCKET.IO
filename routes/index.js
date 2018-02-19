var express = require('express');
var server = require('../bin/www');
var router = express.Router();
var io = require('socket.io')(server);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

io.on('connection', function(socket){
  console.console.log('made socket connection', socket.id);
});

router.get('/chat', function(req, res, next) {
  res.render('chat');
});



module.exports = router;
