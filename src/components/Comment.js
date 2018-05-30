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
import Header from './Header.js';
import API from '.././common/app.api';
import User from './PannelUser';
import Tabbar from './Tabbar';
import Picker from './Picker';
class Comment extends Component{
	constructor(props) {
		super(props);
		this.state = {
			location:[],
			rating:[]
		}
	}
	componentWillMount(){
		
	}
	async componentDidMount(){
		let location = await Common.requestAsync({type:'GET', url: API.getLocation()});
		this.setState({location: location});
		this.getComment();
	}
	async getComment(){
		let location = [];
		$('.list-room input:checkbox').each(function () {
			if ($(this).is(':checked')) {
				location.push($(this).val());
			}
		 });
		let from = $('.date-from').attr('data-date') + ' 06:00';
		let to = $('.date-to').attr('data-date') + ' 23:00';
		var opt = {
				date_from: from, 
				date_to: to, 
				location: location, 
				langid: '1'
		};
		let comment = [];
		comment = await Common.requestAsync({type:'GET', url: API.getRatingDetail(), data: opt});
		this.setState({rating: comment.reverse()});
		$('.messages').scrollTo($('.messages').get(0).scrollHeight);
		return comment;
	}
	render(){
		return(
			<div style={{'height': '100%'}}>
				<User />
				<div className="views tabs toolbar-through">
					<Picker location={this.state.location} callback={this.getComment.bind(this)}/>
					<div id="comment" className="view tab active">
						<div className="navbar-through">
							<Header name="RESPONDENTS" logo={this.props.logo}/>
							<div className="page" data-page="">
								<div className="page-content messages-content">
									<div className="messages">
								      {/*<!-- Messages title -->*/}
								      {/*<div className="messages-title"><b>Sunday, Feb 9,</b> 12:58</div>*/}
								      {/*<!-- Full layout sent message -->*/}
								      {this.state.rating.map(function(item, index){
									      return(
									      	 <div key={"rating__" + index} className="message message-received message-first message-last message-tail">
										        <div className="message-avatar" ></div>
										        <div className="message-content">
										          {/*<div className="message-name">{item.store_name}</div>*/}
										          <div className="message-header">{item.store_name}</div>
										          <div className="message-bubble">
										            <div className="message-text-header">{item.smile_name}</div>
										            <div className="message-text">{item.rating}</div>
										            <div className="message-text-footer">{item.date}</div>
										          </div>
										          {/*<div className="message-footer">Message footer</div>*/}
										        </div>
										      </div>
									      )
								      },this)}
									</div>
								</div>
							</div>
						</div>
					</div>
					<Tabbar index="3"/>
				</div>
			</div>
		);
	}
}
export default Comment;