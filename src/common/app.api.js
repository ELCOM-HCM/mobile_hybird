import Common from './app.common';
var eAPI = {
	ip: 'demo.e-smile.vn',
	port:'3000'
}
eAPI.getPathContent = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/content/';
}
eAPI.login = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/tablet/login';
}
eAPI.location = function(){
		return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/tablet/location?id=' + Common.user.id;
}
eAPI.register = function(type){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/tablet/register';
}
eAPI.smile = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/tablet/smile';
}
eAPI.rating = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/tablet/rating';
}
eAPI.comment= function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/tablet/comment';
}
eAPI.info = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/tablet/info';
}
// api for mobile phone
eAPI.getLocation = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/location?id=' + Common.user.user_id;
}
eAPI.getEmployee = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/employee';
}
eAPI.getEmployeeCompare = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/employee/compare';
}
eAPI.getSmile = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/smile';
}
eAPI.getRating = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/rating/all';
}
eAPI.getRatingById = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/rating';
}
eAPI.getSurvey = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/survey/vote';
}
eAPI.getNotify = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/mobile/notify/all';
}
eAPI.deleteNotify = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/mobile/notify/delete';
}
eAPI.deleteNotifyAll = function(){
	return 'http://' + eAPI.ip + ':' + eAPI.port + '/farm_labiang/mobile/notify/delete/all';
}
export default eAPI;