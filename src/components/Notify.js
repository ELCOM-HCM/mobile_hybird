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
import API from '.././common/app.api';
import Header from './Header.js';
import User from './PannelUser';
import Tabbar from './Tabbar';
import FWPlugin from '.././common/app.plugin';
import renderHTML from 'react-render-html';
class Notify extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notifications:[{id: '-1', name: 'No content', time: '', status: '1', location: ""}],
		}
	}
    componentWillMount(){
    	
    }
    componentDidMount(){
    	this._checkNotify();
    }
    _checkNotify(){
    	Common.request({url:API.getNotify(), 
    			data: {user_id: Common.user == null? '-1' : Common.user.user_id}, 
    			type: 'GET'}, function(res){
			var notifications = [];
			var length = res.length;
			var open = 0;
			for(var i = 0; i < length; i++){
				var obj = {
					id: res[i].id,
					name: res[i].name,
					status: res[i].status,
					time: res[i].time,
					location: res[i].location,
					room: res[i].folio
				}
				if(obj.status == 0){
					open++;
				}
				notifications.push(obj);
			}
			if(notifications.length > 0){
				if(this.refs.refNotify){
					this.setState({
						notifications: notifications
					});
				}
				
			} else {
				if(this.refs.refNotify){
					this.setState({
						notifications:[{id: '-1', name: 'No content', time: '', status: '1', location: ""}]
					});
				}
			}
			if(open > 0){
				$('.toolbar a[id="num_notify"] i span').text(open);
				$('.toolbar a[id="num_notify"] i span').removeClass("hidden");
			} else {
				$('.toolbar a[id="num_notify"] i span').addClass('hidden');
			}
    	}.bind(this));
    	
    }
    
    deleteClick(item){
		var _= this;
		var $this = ReactDOM.findDOMNode(this.refs["noty__" + item.id]);
		var arr = [];
		arr.push(item.id);
		FWPlugin.confirm('Are you sure delete?', 'ESMILE', function () {
	   		var obj = {
	   			id: arr,
	   			user_id: Common.user.user_id
	   	  };
		 Common.request({url: API.deleteNotify(), data: obj, type: 'GET'}, function(response){
			 if(response.status == "1"){
				 _._checkNotify();
			 }
		 });
		});
	}
    _renderHTML(obj){
    	var badge = <span className="badge color-green"></span>;
    	var time = <div className="item-text">
						<i className="fa fa-calendar" aria-hidden="true"></i> {obj.time}
					</div>;
    	var location = <div className="item-text">
							<i className="fa fa-map-marker" aria-hidden="true"></i> {renderHTML(obj.location)}
				       </div>;
		if(obj.status == 1){
    		badge = <span className="badge"></span>;
    	}
		var swipeout = <a href="#" ref="delete_click" onClick={this.deleteClick.bind(this, obj)} 
						data-index={obj.index} className="bg-red e-delete">Delete</a>;
		if(obj.id == "-1"){ // no content
			badge = '';
			swipeout = '';
		}
		
		var tmp = <li ref={"noty__" + obj.id} key={"noty__" + obj.id} id={"noty__" + obj.id} className="swipeout">
				  <div className="swipeout-content">
				   <a href="#" className="item-content item-link">
				     <div className="item-inner">
				        <div className="item-title-row">
				          <div className="item-title" style={{"whiteSpace": "normal"}}>{renderHTML(obj.name)} </div>
				          <div className="item-after">
								{badge}
				          </div>
				        </div>
						{obj.time != "" ? time : ""}
						{obj.location != "" ? location : ""}
				      </div>
				    </a>
				  </div>
				  <div className="swipeout-actions-right">
						{swipeout}
				  </div>
				</li>;
		return (tmp);
	};
	deleteAll(){
		var _= this;
		var arr = [];
		FWPlugin.confirm('Are you sure delete all?', 'ESMILE', function () {
			var notify = _.state.notifications
			for(var i = 0;i < notify.length; i++){
				arr.push(notify[i].id);
			}
	   		var obj = {
	   			id: [-1],
	   			user_id: Common.user.user_id
	   	  };
		 Common.request({url: API.deleteNotifyAll(), data: obj, type: 'GET'}, function(response){
			 if(response.status == "1"){
				 _._checkNotify()
			 }
		 });
		});
	}
	render(){
		return (
			<div style={{'height': '100%'}}>
				<User />
				<div className="views tabs toolbar-through">
					<div id="notify" className="view tab active">
						<Header name="NOTIFICATION" type={true} callback={this.deleteAll.bind(this)}/>
				        <div className="navbar-fixed">
				          <div data-page="notify" className="page">
				            <div className="page-content">
				              <div className="list-block media-list">
								  <ul ref="refNotify">
								  	{this.state.notifications.map(this._renderHTML, this)}
								  </ul>
								</div>
				            </div>
				          </div>
				        </div>
			      </div>
			      <Tabbar index="4"/>
				</div>
			</div>
			
		);
	}
}
export default Notify;