import React, { Component } from 'react';
import cookie from "react-cookie";
import Plugin from ".././common/app.plugin";
import Common from  ".././common/app.common";
import API from '.././common/app.api';
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class Tabbar extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			num_notify:0
		}
	}
	componentWillMount() {
	}
	componentDidMount(){
		setInterval(this.getNotify.bind(this), 3000);
	}
	getNotify(){
		Common.request({url:API.getNotify(), 
    			data: {user_id: Common.user == null? '-1' : Common.user.user_id}, 
    			type: 'GET'}, function(res){
			var length = res.length;
			var open = 0;
			for(var i = 0; i < length; i++){
				if(res[i].status == 0){
					open++;
				}
			}
			if(this.refs.tabbar){
				this.setState({num_notify: open});
			}
    	}.bind(this));
	}
	render(){
		const {num_notify} = this.state;
		return(
			<div className="toolbar tabbar tabbar-labels"> 
				<div className="toolbar-inner" ref="tabbar">
					<Link to={'/csat'} replace className={this.props.index == "1"? "tab-link active": "tab-link"}> 
					 <i className="fa fa-2x fa-smile-o"></i>
					 <span className="tabbar-label">CSAT</span>
					</Link>
					<Link to={'/nps'} replace className= {this.props.index == "2"? "tab-link active": "tab-link"}> 
						<i className="fa fa-tachometer" style={{fontSize: '27px'}} aria-hidden="true"></i>
						<span className="tabbar-label">NPS</span>
					</Link>
					<Link to={'/comment'} replace className= {this.props.index == "3"? "tab-link active": "tab-link"}> 
						<i className="fa fa-commenting" style={{fontSize: '27px'}} aria-hidden="true"></i>
						<span className="tabbar-label">RESPONDENTS</span>
					</Link>
					<Link to={'/notify'} replace id="num_notify" className={this.props.index == "4"? "tab-link active": "tab-link"}> 
						<i className="ios-icons icons-bell">bell_fill<span className={num_notify > 0 ? "badge bg-red":"badge bg-red hidden"}>{num_notify}</span></i><span
						className="tabbar-label">NOTIFICATION</span></Link>
				</div>
			</div>
		);
	};
}
export default Tabbar;