import eCommon from './app.common';
var eAPI = {
	ip: 'esmile.e-smile.vn', //'103.254.12.200',
	port:'3001'
}
eAPI.pathContent = function(){
	return 'http://' + eAPI.ip + ':3001' + '/ecopark/content/';
}
eAPI.login = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/tablet/login';
}
eAPI.location = function(){
		return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/tablet/location';
}
eAPI.register = function(type){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/tablet/register';
}
eAPI.smile = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/tablet/smile';
}
eAPI.rating = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/tablet/rating';
}
eAPI.comment= function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/tablet/comment';
}
eAPI.info = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/tablet/info';
}
// api for mobile phone
eAPI.getDepartment = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/tablet/department?key=-1&langid=2';
}
eAPI.getLocation = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/location';
}
eAPI.getRoom = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/room';
}
eAPI.getSmile = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/smile';
}
eAPI.getRating = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/rating/all';
}
eAPI.getSurvey = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/survey/vote';
}
eAPI.getNotify = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/mobile/notify/all';
}
eAPI.deleteNotify = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/mobile/notify/delete';
}
eAPI.deleteNotifyAll = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/ecopark/mobile/notify/delete/all';
}
export default eAPI;