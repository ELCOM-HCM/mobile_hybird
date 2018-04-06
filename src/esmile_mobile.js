/**
 * @author DangTM
 * @Date 15/04/2017
 */
import React from 'react';
import ReactDOM from 'react-dom';
import FWPlugin from './common/app.plugin';
import Index from './components/IndexPage';
import Login from './components/Login';
import Home from './components/Home';
import Common from './common/app.common';
import { browserHistory } from 'react-router';
import { HashRouter as Router, Route, Link, hashHistory, IndexRoute  } from 'react-router-dom';

ReactDOM.render((
		   <Router history={browserHistory}>
			 <div style={{'height': '100%'}}>
				<Route path="/" exact component={Index}/>
			    <Route path="/login" component={Login}/>
				<Route path="/home" component={Home}/>
			</div>
		   </Router>
		), document.getElementById('root'));
$('.date-from').on('change', function(){
	this.setAttribute(
	   "data-date", 
	   moment(this.value, "YYYY-MM-DD").format( this.getAttribute("data-date-format")));
});
$('.date-to').on('change', function(){
	this.setAttribute(
	   "data-date", 
	   moment(this.value, "YYYY-MM-DD").format( this.getAttribute("data-date-format")));
});


