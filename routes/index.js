var express = require('express');
var router = express.Router();
var io = require('socket.io');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

module.exports = router;
