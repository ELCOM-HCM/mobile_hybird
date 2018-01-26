/**
 * @author DangTM
 * @Date 15/04/2017
 */
import React from 'react';
import { render } from 'react-dom';
import FWPlugin from './common/app.plugin';
import App from './components/AppMobile';
import Common from './common/app.common';

render(<App/>, document.getElementById('root'));


var $$ = Dom7;
FWPlugin.showIndicator();
setTimeout(function () {
	FWPlugin.hideIndicator();
}, 1500);
$$('.pull-to-refresh-content').on('ptr:refresh', function(e){
	setTimeout(function(){
		FWPlugin.pullToRefreshDone();
	}, 1000);
});
$$('.date-from').on('change', function(){
	this.setAttribute(
	   "data-date", 
	   moment(this.value, "YYYY-MM-DD").format( this.getAttribute("data-date-format") ));
});
$$('.date-to').on('change', function(){
	this.setAttribute(
	   "data-date", 
	   moment(this.value, "YYYY-MM-DD").format( this.getAttribute("data-date-format") ));
});
FWPlugin.onPageInit('trend', function(page){
//	var date = Common.getLast30Days();
//	var today = new Date();
//	$$('#date-from').val(moment().subtract('days', 30).format('YYYY-MM-DD'));
//	$$('#date-to').val(moment().format('YYYY-MM-DD'));
//	$$('#date-from').attr(
//			   "data-date", 
//			   moment().subtract('days', 30).format( $$('#date-from').attr("data-date-format") ));
//	$$('#date-to').attr(
//			   "data-date", 
//			   moment().format( $$('#date-from').attr("data-date-format") ));
});
FWPlugin.init();


