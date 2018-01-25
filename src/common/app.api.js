import eCommon from './app.common';
var eAPI = {
	ip: 'hontam.e-hotel.vn',
	port:'3000'
}
eAPI.pathContent = function(){
	return 'http://' + eAPI.ip + ':3119' + '/content/';
}
eAPI.login = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/tablet/login';
}
eAPI.location = function(){
		return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/tablet/location';
}
eAPI.register = function(type){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/tablet/register';
}
eAPI.smile = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/tablet/smile';
}
eAPI.rating = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/tablet/rating';
}
eAPI.comment= function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/tablet/comment';
}
eAPI.info = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/tablet/info';
}
// api for mobile phone
eAPI.getLocation = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/tablet/location';
}
eAPI.getRoom = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/room';
}
eAPI.getSmile = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/smile';
}
eAPI.getRating = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/rating/all';
}
eAPI.getSurvey = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/survey/vote';
}
eAPI.getNotify = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/mobile/notify/all';
}
eAPI.deleteNotify = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/mobile/notify/delete';
}
eAPI.deleteNotifyAll = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/api/mobile/notify/delete/all';
}
export default eAPI;