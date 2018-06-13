/**
 * @author DangTM
 * @Date 15/04/2017
 */
import React from 'react';
import ReactDOM from 'react-dom';
import FWPlugin from './common/app.plugin';
import App from './components/AppMobile';
import Common from './common/app.common';
import CSAT from './components/CSAT';
import NPS from './components/NPS';
import Notify from './components/Notify';
import Index from './components/IndexPage';
import Login from './components/Login';
import Comment from './components/Comment';
import { browserHistory } from 'react-router';
import { HashRouter as Router, Route, Link, hashHistory, IndexRoute  } from 'react-router-dom'; // recommend

//render(<App/>, document.getElementById('root'));
ReactDOM.render((
	   <Router history={browserHistory}>
		 <div style={{'height': '100%'}}>
			<Route exact path="/" component={Login}/>
		    <Route path="/login" component={Login}/>
			<Route path="/csat" component={CSAT}/>
			<Route path="/nps" component={NPS}/>
			<Route path="/comment" component={Comment}/>
			<Route path="/notify" component={Notify}/>
		</div>
	   </Router>
	), document.getElementById('root'));

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

//  FWPlugin.onPageInit('rating', function(page){
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
//});
FWPlugin.init();


