/**
 * 
 * @author DangTM R&D Department
 * @date Jul 2, 2017
 * @addr ELCOM-HCM
 * 
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import renderHTML from 'react-render-html';
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
		let location = await Common.requestAsync({type:'GET', data:{key:'-1', lang_id: 1, type: 1}, url: API.info()});
		this.setState({location: location.locations});
		this._getComment();
	}
	async _getComment(){
		let _=this;
		let location = [];
		$('.list-room input:checkbox').each(function () {
			if ($(this).is(':checked')) {
				location.push($(this).val());
			}
		 });
		let from = $('.date-from').attr('data-date') + ' 06:00';
		let to = $('.date-to').attr('data-date') + ' 23:00';
		let employee = await Common.requestAsync({type:'GET', data:{location: location}, url: API.getEmployee()});
		let emplId = employee.map(x=>x.id);
		var opt = {
				date_from: from, 
				date_to: to, 
				filter: emplId,
				id: '5',
				langid:'1',
				type:'employee'
		};
		let comment = await Common.requestAsync({type:'GET', url: API.getComment(), data: opt});
		console.log(comment);
		if(this.refs.comment){
			this.setState({rating: comment});
		}
	}
	render(){
		const {rating} = this.state;
		return(
			<div style={{'height': '100%'}}>
				<User />
				<div className="views tabs toolbar-through">
					<Picker location={this.state.location} callback={this._getComment.bind(this)}/>
					<div id="comment" className="view tab active">
						<div className="navbar-through">
							<Header name="RESPONDENTS" logo={this.props.logo}/>
							<div className="page" data-page="">
								<div className="page-content messages-content">
									<div ref="comment" id="messages" className="messages">
								      {/*<!-- Messages title -->*/}
								      {/*<div className="messages-title"><b>Sunday, Feb 9,</b> 12:58</div>*/}
								      {/*<!-- Full layout sent message -->*/}
								      {rating.map(function(item, index){
									      return(
									      	 <div key={"rating__" + index} className="message message-received message-first message-last message-tail">
										      	{/*<div className="message-avatar"></div>*/}
										        <div className="message-content">
										          <div className="message-name">
										          	<i className="fa fa-user" aria-hidden="true"></i> {item.employee}</div>
										          <div className="message-header">
										          	<i className="fa fa-map-marker" aria-hidden="true"></i> {renderHTML(item.location)}</div>
										          <div className="message-bubble">
										            <div className="message-text-header">{renderHTML(item.rating)}</div>
										            <div className="message-text">{renderHTML(item.comment || "")}</div>
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