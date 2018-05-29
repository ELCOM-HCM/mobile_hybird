/**
 * 
 * @author DangTM R&D Department
 * @date Jul 2, 2017
 * @addr ELCOM-HCM
 * 
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Common from  ".././common/app.common";

class TabletRating extends Component{
	constructor(props) {
		super(props);
	}
	componentWillMount(){
		
	}
	componentDidMount(){
		
	}
	render(){
		return(
			<div id="nps" className="view view-main tab">
				<div className="navbar-through">
					<Header name="NET PROMOTER SCORE" logo={this.props.logo}/>
					<div className="page" data-page="">
						<div className="page-content messages-content">
							<div className="messages">
						      {/*<!-- Messages title -->*/}
						      <div className="messages-title"><b>Sunday, Feb 9,</b> 12:58</div>
						      {/*<!-- Full layout sent message -->*/}
						      <div className="message message-sent">
						        <div className="message-avatar" style="background-image:url(http://lorempixel.com/100/100/people/7);"></div>
						        <div className="message-content">
						          <div className="message-name">John Doe</div>
						          <div className="message-header">Message header</div>
						          <div className="message-bubble">
						            <div className="message-text-header">Text header</div>
						            <div className="message-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
						            <div className="message-text-footer">Text footer</div>
						          </div>
						          <div className="message-footer">Message footer</div>
						        </div>
						      </div>
						      {/*<!-- Full layout received message -->*/}
						      <div className="message message-received">
						        <div className="message-avatar" style="background-image:url(http://lorempixel.com/100/100/people/7);"></div>
						        <div className="message-content">
						          <div className="message-name">John Doe</div>
						          <div className="message-header">Message header</div>
						          <div className="message-bubble">
						            <div className="message-text-header">Text header</div>
						            <div className="message-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
						            <div className="message-text-footer">Text footer</div>
						          </div>
						          <div className="message-footer">Message footer</div>
						        </div>
						      </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export TabletRating default;