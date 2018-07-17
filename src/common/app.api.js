import Common from './app.common';
var eAPI = {
	ip: 'esmile.e-smile.vn',
	port:'3001',
	context: '/tmv'
}
eAPI.getPathContent = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/content/');
}
eAPI.login = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/tablet/login');
}
eAPI.register = function(type){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/tablet/register');
}


// api for mobile phone

/**
 * input {id: "user_id"}
 */
eAPI.getStore = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/store');
}
/**
 * input {id: "store id"}
 */
eAPI.getLocation = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/location');
}
/**
 * input {location: [1,2,3]}
 */
eAPI.getEmployee = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/employee');
}
/**
 * input {key:'-1', lang_id: 1, type: 1}
 */
eAPI.info = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/tablet/info');
}
/**
 * input {employee:['1', '2', '3'], location:['1', '2', '3'], date_from: 'dd-mm-yyyy hh:mm', date_to: 'dd-mm-yyyy hh:mm',langid:''}
 */
eAPI.getRatingByEmployee = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/data/overview');
}
/**
 * input {date_from: 'dd-mm-yyyy hh:mm', date_to: 'dd-mm-yyyy hh:mm', employee:['1', '2', '3'], location:['1','2']}
 */
eAPI.getRatingEmployee = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/mobile/ratingEmployee');
}
/**
 * input {date_from: 'dd-mm-yyyy hh:mm', date_to: 'dd-mm-yyyy hh:mm', store_id:['1', '2', '3']}
 */
eAPI.getRatingService = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/mobile/ratingService');
}
/**
 * input {id: 'smile id', filter:['1', '2', '3'], date_from: 'dd-mm-yyyy hh:mm', date_to: 'dd-mm-yyyy hh:mm', langid:'', type: 'location/employee/store'}
 * filter is id of type
 */
eAPI.getComment = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/smile/comment');
}
/**
 * input {employee:['1', '2', '3'], date_from: 'dd-mm-yyyy hh:mm', date_to: 'dd-mm-yyyy hh:mm', langid:''}
 */
eAPI.getStatisticEmpl = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/employee/smile/statistic');
}
/**
 * input {store:['1', '2', '3'], date_from: 'dd-mm-yyyy hh:mm', date_to: 'dd-mm-yyyy hh:mm',langid:''}
 */
eAPI.getServiceOverview = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/service/overview');
}
eAPI.getEmployeeCompare = function(){
	return 'http://'.concat(eAPI.ip, ':', eAPI.port, eAPI.context, '/employee/compare');
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


export default eAPI;