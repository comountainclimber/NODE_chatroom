
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socketio = require('socket.io')
var app = express();
var bodyParser = require('body-parser')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


//index route
app.get('/', function(req, res){
  res.sendFile('index.html', { root: './public/html' });
})


//Create the server
// var server = http.createServer(app)

//Start the web socket server
var io = socketio.listen(http);

var usersArray = []
var users = {}
var numUsers = 0

//If the client just connected
io.on('connection', function(socket) {
	console.log('a user connected')
	socket.on('disconnect', function(){
		// for (var i = 0; i < usersArray; i++) {
		// 	if (socket.username===usersArray[i].name) {
		// 	console.log(usersArray[i])
		// 	}
		// };

		console.log(socket.username, 'has disconnected');
	});
// when the client emits 'new message', this listens and executes
socket.on('message', function (data){
	var allData = {
		data: data,
		user: socket.username
	}
	io.emit('message', allData);

})
socket.on('username', function (user) {
	// console.log("username: ",user)
	usersArray.push(user)
	// console.log("allUsers: ", usersArray)
	socket.username = user;
	users[user] = user;
	io.emit('user', usersArray);
});
socket.on('userData', function(userData){
	io.emit('users', users)
})


});

http.listen(3000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});


