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
import CSAT from './CSAT';
import Cookie from "react-cookie";
import { Redirect } from 'react-router';
class Index extends Component{
	constructor(props) {
		super(props);
		this.state = {
			type: 0 // default Login Screen
		}
	}
	async componentWillMount() {
		Common.logs('CHECK LOGIN');
		Common.user = Cookie.load("user");
		var _=this
		if(Cookie.load('user') != undefined && Common.user.login != undefined && !Common.user.login){
			this.setState({type: 0});
			return;
		}
		let status = await Common.requestAsync({url: '/checkLogin',type: 'POST'});
		if(this.refs.index_page && Cookie.load("user") != undefined){
			this.setState({type: status});
		}
	}
	componentDidMount(){	
	}
	render(){
		const {type} = this.state;
		return (
			<div ref="index_page">
				{type?(<Redirect to="/hotel"/>) : (<Redirect to="/login"/>)}
			</div>
		);
	}
}
export default Index;