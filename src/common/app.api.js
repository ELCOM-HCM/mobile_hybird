import Common from './app.common';
var eAPI = {
	ip: 'esmile.e-smile.vn',
	port:'3001'
}
eAPI.pathContent = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/content/';
}
eAPI.login = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/tablet/login';
}
eAPI.location = function(){
		return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/tablet/location?id=' + Common.user.id;
}
eAPI.register = function(type){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/tablet/register';
}
eAPI.smile = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/tablet/smile';
}
eAPI.rating = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/tablet/rating';
}
eAPI.comment= function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/tablet/comment';
}
eAPI.info = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/tablet/info';
}
// api for mobile phone
eAPI.getLocation = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/location?id=' + Common.user.user_id;
}
eAPI.getEmployee = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/employee';
}
eAPI.getEmployeeCompare = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/employee/compare';
}
eAPI.getSmile = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/smile';
}
eAPI.getRating = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/rating/all';
}
eAPI.getRatingById = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/rating';
}
eAPI.getSurvey = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/survey/vote';
}
eAPI.getNotify = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/mobile/notify/all';
}
eAPI.deleteNotify = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/mobile/notify/delete';
}
eAPI.deleteNotifyAll = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/pantio/mobile/notify/delete/all';
}
export default eAPI;