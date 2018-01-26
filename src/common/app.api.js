import Common from './app.common';
var eAPI = {
	ip: 'esmile.e-smile.vn',
	port:'3000'
}
eAPI.pathContent = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/content/';
}
eAPI.login = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/tablet/login';
}
eAPI.location = function(){
		return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/tablet/location?id=' + Common.user.id;
}
eAPI.register = function(type){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/tablet/register';
}
eAPI.smile = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/tablet/smile';
}
eAPI.rating = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/tablet/rating';
}
eAPI.comment= function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/tablet/comment';
}
eAPI.info = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/tablet/info';
}
// api for mobile phone
eAPI.getLocation = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/location?id=' + Common.user.user_id;
}
eAPI.getEmployee = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/employee';
}
eAPI.getEmployeeCompare = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/employee/compare';
}
eAPI.getSmile = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/smile';
}
eAPI.getTrend = function(){
	return 'http://esmile.e-smile.vn:19094/trend.json';
}
eAPI.getRating = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/rating/all';
}
eAPI.getRatingById = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/rating';
}
eAPI.getSurvey = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/survey/vote';
}
eAPI.getNotify = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/mobile/notify/all';
}
eAPI.deleteNotify = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/mobile/notify/delete';
}
eAPI.deleteNotifyAll = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/vna/mobile/notify/delete/all';
}
export default eAPI;