/**
 * 
 * @author DangTM R&D Department
 * @date May 23, 2017
 * @addr ELCOM-HCM
 * 
 */
import '../assets/stylesheets/css/app-login.css';
import React, { Component } from 'react';
import Cookie from "react-cookie";
import FWPlugin from ".././common/app.plugin";
import ReactDOM from "react-dom";
import Common from  ".././common/app.common";
import Widget from '.././common/app.widget';
//import {Link} from 'react-router-dom';
//import Widget from '.././common/app.widget';
class Login extends React.Component{
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		console.log('Welcome to login screen');
		// auto login
		if(Cookie.load('user') != undefined){
			//this.login();
		}
	}
	componentDidMount(){

	}
	login(){
		var username = $(ReactDOM.findDOMNode(this.refs.username)).val() || (Cookie.load("user") == undefined? "": Cookie.load("user").username);
		var password = $(ReactDOM.findDOMNode(this.refs.password)).val() || (Cookie.load("user") == undefined? "": Cookie.load("user").password);
		console.log(username + password);
		if(username == "" && password == ""){
			return;
		}
		var obj = {
			url: '/login',
			type: 'POST',
			data: {username: username, password: password}
		}
		Common.request(obj, function(res){
			Common.logs(res);
			// check login
			if(res.status){
				if(Cookie.load("user") == undefined){
					var date = new Date();
					date.setFullYear(date.getFullYear() + 10); // set expires 10 year
					Cookie.save("user", JSON.stringify({username: username, password: password, user_id: res.user.user_id}), {expires: date});
				}
				Cookie.save("user", JSON.stringify({username: username, password: password, user_id: res.user.user_id}), {expires: date});
				Common.user = res.user;
				Widget.callAndroid({cmd:'set', key:'USER_ID', value: Common.user.user_id});
				console.log(">>>>>>>>>>>>>>> SEND USER_ID " + Common.user.user_id);
				location.href="/#/home";
				location.reload();
				FWPlugin.closeModal('.login-screen');
			} else {
				FWPlugin.modal({
					title: 'ELCOM',
					text: '<p class="color-red"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> LOGIN FAIL</p>', 
					buttons: [
					     {text: '<span class="color-red"><i class="ios-icons">close</i> close</span>', bold: true}
					]
				});
			}
		});
		return false;
	}
	render(){
		return(
			<div className="login-screen">
				<div data-page="login-screen" className="page no-navbar no-toolbar no-swipeback">
				  <div className="page-content login-screen-content">
					<form style={{'marginTop': '30%'}}>
				      <div className="thumbnail">
				      	<img src="/styles/images/logo.png" />
				      </div>
				      <div className="list-block">
				        <ul>
				          <li className="item-content">
				            <div className="item-inner">
				              <div className="item-title label">
				              	<i className="ios-icons">person</i>
				              </div>
				              <div className="item-input">
				                <input type="text" ref="username" name="username" placeholder="Username"/>
				              </div>
				            </div>
				          </li>
				          <li className="item-content">
				            <div className="item-inner">
				              <div className="item-title label">
				          		<i className="ios-icons">lock</i>
				          	  </div>
				              <div className="item-input">
				                <input type="password" ref="password" name="password" placeholder="Password"/>
				              </div>
				            </div>
				          </li>
				        </ul>
				      </div>
				      <div className="list-block">
				        <ul>
				          <li>
				          	<p>
				          		<a href="#" onClick={this.login.bind(this)} className="button button-round active"><i className="ios-icons">login</i> Login</a>
				          	</p>  
				          </li>
				        </ul>
				      </div>
				    </form>
				  </div>
				</div> 
			</div>
		);
	};
}
export default Login;