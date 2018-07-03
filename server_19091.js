var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 19091;  
var io = require('socket.io')(server);
var flash    = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('express-logger');
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan');
var common = require('./common');
var request = require('request');
var webpackDevServer = require('webpack-dev-server');
var fs = require('fs');
var data = [];
var timer;
var clients = [];
require('./config/passport')(passport);

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { }));
  app.use(webpackHotMiddleware(compiler));
}
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, '/')));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(morgan('dev')); // log every request to the console
//required for passport
app.use(session({ 
		secret: 'dangtm',
		cookie: { maxAge : 3600000 }
	})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use('/', express.static(path.join(__dirname, '/')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/styles', express.static(path.join(__dirname, 'src/assets/stylesheets')));
app.use('/common', express.static(path.join(__dirname, 'src/common')));
app.use('/model', express.static(path.join(__dirname, 'src/model')));

var server = require('http').createServer(app);

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/esmile_mobile.html');
});
app.get('/esmile/elcom', function(request, response) {
   response.sendFile(__dirname + '/dist/esmile_mobile.html');
});

app.get('/mobile', function(request, response) {
  response.sendFile(__dirname + '/dist/esmile_mobile_vinpearl.html')
});
app.get('/home', isLoggedIn, function(req, res){
	common.log('Go to home page ' + ' session ID ' + req.sessionID);
	res.send({status: 1, message: 'Success', user: req.user});
});
app.post('/checkLogin', function(req, res) {
	common.log('Go to check login ' + ' session ID ' + req.sessionID);
	if(req.isAuthenticated()){
		res.send({status: 1, message: 'Login success', user: req.user});
		return;
	}
	res.send({status: 0, message: 'Login fail'});
});
app.get('/login', function(req, res){
	common.log('Go to login page' + ' session ID ' + req.sessionID);
	res.send({status: 0, message: 'Login fail'});
});
app.post('/logout', function(req, res){
	common.log('Go to logout page' + ' session ID ' + req.sessionID); 
	req.session.destroy();
	req.logout();
	res.send({status: 1, message: 'Logout success'});
});
app.post('/login', passport.authenticate('local-login', {
	successRedirect : '/home', // redirect to the secure profile section
	failureRedirect : '/login', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

io.sockets.on('connection', function(socket){
	  common.log('user connect socket >> ' + socket.id);
	  clients.push({socket_id: socket.id, user_id:'', data:[]});
	  clearInterval(timer);
	  timer = setInterval(()=> {
		  request.get('http://demo.e-smile.vn:3000/farm_labiang/mobile/notify', function(error, response, body){
			//  console.dir(JSON.parse(body));
			  if(error){
				  common.log(error);
				  return;
			  }
			  console.dir(clients);
			  var isChange = false;
			  var arrReceive = JSON.parse(body).data;
			  for(var i = 0; i < clients.length; i++){
				  clients[i].data = [];
				  for(var j = 0; j < arrReceive.length; j++){
					  var user = arrReceive[j].user_id;
					  if(user.indexOf(clients[i].user_id) >= 0){ 
						  clients[i].data.push(arrReceive[j]);
					  }
				  }
				  var object = {
						    "message": "SUCCESS",
						    "status": "1",
						    "data": clients[i].data
				  }
				  if(clients[i].data.length > 0){
					  console.log('Send data to ' + clients[i].socket_id);
					  console.log(object);
					  io.sockets.connected[clients[i].socket_id].emit('receiveNotify', object);
				  }
			  }
			  
			  
			  /*if(data.length == arrReceive.length && data.every(function(element, i){
				  return is(element, arrReceive[i])
			  })){
				  io.sockets.emit('receiveNotify', JSON.parse(body));
			  } else {
				  console.log('Notify not change');
			  }*/
		  });
	  }, 7000);
//	  console.dir(clients);
	  common.log('send message to socket');
	  io.sockets.connected[socket.id].emit('receiveSocketID', {socket_id: socket.id}, function(data) {
		  console.log('Send socket ' + socket.id);
	  });
	 socket.on('sendUserID', function (data) {
		  common.log('Receive userID ');
		  console.log(data);
		  var obj = JSON.parse(data);
		  for(var i = 0; i < clients.length; i++){
			  if(clients[i].socket_id == obj.socket_id){
				  clients[i].user_id = obj.user_id;
			  }
		  }
		  
	  });	  
	  socket.on('disconnect', function() {
	        var index = -1;
	        for(var i = 0; i < clients.length; i++){
	        	if(clients[i].socket_id == socket.id){
	        		index = i;
	        		break;
	        	}
	        }
	        if (index != -1) {
	            clients.splice(index, 1);
	            console.info('Client gone (id=' + socket.id + ').');
	        }
	  });
});
server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info(">> Server listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
app.get('/log4j',function(req,res){
	  var ip = req.headers['x-forwarded-for'] ||
	  req.connection.remoteAddress ||
	  req.socket.remoteAddress ||
	  req.connection.socket.remoteAddress;
	  console.log(getDateTime(), 'Request by IP', ip);
	  // get parameter
	  var data = req.query.data;
	  console.log(getDateTime(), "Param data >>",data);
	  res.send("Server received message");	  
});
function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return day + "/" + month + "/" + year + " " + hour + ":" + min + ":" + sec;
}
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	console.log('__________>> isLoggedIn ', req.isAuthenticated());
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}
