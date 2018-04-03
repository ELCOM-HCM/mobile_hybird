var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var cors = require("cors");
var bodyParser = require('body-parser'); 
var request = require('request');
var common = require('./common');

router.use(cors());
router.use(express.static(path.join(__dirname, '/')));
router.use(express.static(path.join(__dirname, '/dist')));
router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
router.use('/styles', express.static(path.join(__dirname, 'src/assets/stylesheets')));
router.use('/common', express.static(path.join(__dirname, 'src/common')));
router.use('/model', express.static(path.join(__dirname, 'src/model')));

// using webpack-dev-server and middleware in development environment
//if(process.env.NODE_ENV !== 'production') {
//	var webpackDevMiddleware = require('webpack-dev-middleware');
//	var webpackHotMiddleware = require('webpack-hot-middleware');
//	var webpack = require('webpack');
//	var config = require('./webpack.config.1');
//	var compiler = webpack(config);
//	
//	router.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
//	router.use(webpackHotMiddleware(compiler));
//}
router.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/esmile_mobile.html');
});
router.use(function(req,res,next) {
  console.log("/" + req.method, req.originalUrl, common.getDateTime());
// req.io.sockets.emit('update', 'hello'); 
  console.log(req.io);
  res.header("Content-Type",'application/json');
  next();
});

router.get('/', function(req, res){
  res.send("[eSmile]-PORTAL");
});



module.exports = router;