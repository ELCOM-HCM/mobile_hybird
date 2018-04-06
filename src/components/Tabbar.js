import React, { Component } from 'react';
import cookie from "react-cookie";
import Plugin from ".././common/app.plugin";
import Common from ".././common/app.common";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class Tabbar extends React.Component{
	constructor(props) {
		super(props);
	}
	componentWillMount() {
	}
	componentDidMount(){
	}
	render(){
		return(
			<div className="toolbar tabbar tabbar-labels">
				<div className="toolbar-inner">
					<Link to={'/trend'}  className="tab-link active">
						<i className="fa fa-line-chart" style={{fontSize: '27px'}} aria-hidden="true"></i>
						<span className="tabbar-label">TREND</span>
					</Link>
					<Link  to={'/'} className="tab-link"> 
						<i className="fa fa-smile-o" style={{fontSize: '27px'}} aria-hidden="true"></i>
						<span className="tabbar-label">RATRING</span></Link>
					<Link to={'/'} className="tab-link"> <i
						className="ios-icons">favorites_fill</i> <span className="tabbar-label">DETAIL RATING</span></Link>
					<Link to={'/'} className="tab-link"> 
						<i className="fa fa-users" style={{fontSize: '27px'}} aria-hidden="true"></i>
						<span className="tabbar-label">EMPLOYEE</span></Link>
					<Link to={'/'}
						className="tab-link"> <i className="ios-icons icons-bell">bell_fill<span className="badge bg-red hidden">0</span></i><span
						className="tabbar-label">NOTIFICATION</span></Link>
				</div>
			</div>
		);
	};
}
export default Tabbar;