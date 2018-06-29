import Common from './app.common';
var eAPI = {
	ip: 'demo.e-smile.vn',
	port:'3000',
	context: '/farm_labiang'
}
eAPI.getPathContent = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/content/');
}
eAPI.login = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/tablet/login');
}
eAPI.location = function(){
		return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/tablet/location?id=' + Common.user.id);
}
eAPI.register = function(type){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/tablet/register');
}
eAPI.smile = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/tablet/smile');
}
eAPI.rating = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/tablet/rating');
}
eAPI.comment= function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/tablet/comment');
}
eAPI.info = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/tablet/info');
}
// api for mobile phone
eAPI.getLocation = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/location?id=' + Common.user.user_id);
}
eAPI.getEmployee = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/employee');
}
eAPI.getEmployeeCompare = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/employee/compare');
}
eAPI.getSmile = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/smile');
}
eAPI.getRating = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/rating/all');
}
eAPI.getRatingById = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/rating');
}
eAPI.getSurvey = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/survey/vote');
}
eAPI.getNotify = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/mobile/notify/all');
}
eAPI.deleteNotify = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/mobile/notify/delete');
}
eAPI.deleteNotifyAll = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/mobile/notify/delete/all');
}
eAPI.getRatingDetail = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/csat/detail');
}
eAPI.getCSAT = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/mobile/csat');
}
eAPI.getNPS = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/mobile/nps');
}
eAPI.getOverview = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/overview/cast/nps');
}
export default eAPI;