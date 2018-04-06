/**
 * 
 * @author DangTM R&D Department
 * @date May 22, 2017
 * @address ELCOM-HCM
 * 
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Common from  ".././common/app.common";
import Login from './Login';
import Cookie from "react-cookie";
class Index extends Component{
	constructor(props) {
		super(props);
		this.state = {
			type: 0 // default Login Screen
		}
	}
	componentWillMount() {
		Common.user = Cookie.load("user");
		console.log(Common.user);
		var _=this;
		if(Cookie.load('user') != undefined && Common.user.login != undefined && !Common.user.login){
			this.setState({type: 0});
			return;
		}
		Common.request({
			url: '/checkLogin',
			type: 'POST'
		}, function(res){
			if(res.status){
				console.log('Check Login');
				_.setState({type: 1});
			} 
		});
	}
	componentDidMount(){	
	}
	render(){
		var login = <Login />;
		if(this.state.type){
			//login = <RoomRating />;
			console.log('Direction to other page');
		}
		return (
			<div>
				{login}
			</div>
		);
	}
}
export default Index;