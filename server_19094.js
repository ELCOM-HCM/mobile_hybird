var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();
var PORT = process.env.PORT || 19094;
var server = require('http').createServer(app);
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
var fs = require('fs');
var data = [];
var timer = 0;
var esmile_portal = require('./esmile-portal');
require('./config/passport')(passport);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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

app.use(express.static(path.join(__dirname, '/')));
app.use(express.static(path.join(__dirname, 'dist')));
if(process.env.NODE_ENV !== 'production') {
	var webpackDevMiddleware = require('webpack-dev-middleware');
	var webpackHotMiddleware = require('webpack-hot-middleware');
	var webpack = require('webpack');
	var config = require('./webpack.config');
	var compiler = webpack(config);
	
	app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
	app.use(webpackHotMiddleware(compiler));
}
app.use(express.static(path.join(__dirname, '/')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/styles', express.static(path.join(__dirname, 'src/assets/stylesheets')));
app.use('/common', express.static(path.join(__dirname, 'src/common')));
app.use('/model', express.static(path.join(__dirname, 'src/model')));
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/esmile_mobile.html');
});
app.get('/log4j',function(req,res){
	  var ip = req.headers['x-forwarded-for'] ||
	  req.connection.remoteAddress ||
	  req.socket.remoteAddress ||
	  req.connection.socket.remoteAddress;
	  console.log(common.getDateTime(), 'Request by IP', ip);
	  // get parameter
	  var data = req.query.data;
	  console.log(common.getDateTime(), "Param data >>",data);
	  res.send("Server received message");	  
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
app.post('/login', passport.authenticate('local-login', {
	successRedirect : '/home', // redirect to the secure profile section
	failureRedirect : '/login', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));
app.post('/logout', function(req, res){
	common.log('Go to logout page' + ' session ID ' + req.sessionID); 
	req.session.destroy();
	req.logout();
	res.send({status: 1, message: 'Logout success'});
});
io.sockets.on('connection', function(socket){
	  common.log('user connect socket');
	  
	  socket.on('request_data', function(data){
		  console.log(data);
		  request({url:'http://hongduc.e-smile.vn:3000/hongduc/smile', qs: data}, (err, response, body)=>{
			  if(err) { console.log(err); return; }
			  request({url:'http://hongduc.e-smile.vn:3000/hongduc/rating/all', qs: data}, (err, response, body1)=>{
				  if(err) { console.log(err); return; }
//				  console.log({smile: body, rating: body1});
				  io.sockets.emit('response_data', {smile: body, rating: body1});
			  });
		  });
		  
	  });
	  socket.on('disconnect', function () {
		 console.log('socket.io is disconnected');
	  });
});
//Make io accessible to our router
app.use('/portal', esmile_portal);
app.use(function(req,res,next){
    req.io = io;
    next();
});

//Handle 404 error.
//The last middleware.
app.use("*",function(req,res){
	res.status(404).sendFile(path.join(__dirname, '404/404.html'));
});
server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info(">> Server listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});

function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	console.log('__________>> isLoggedIn ', req.isAuthenticated());
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}