import '../assets/stylesheets/base.scss';
import '../assets/stylesheets/css/app-rating.css';

import React, { Component } from 'react';
import API from '.././common/app.api';
import ReactDOM from 'react-dom';
import FWPlugin from '.././common/app.plugin';
import Common from '.././common/app.common';
import Login from './Login';
import Widget from '.././common/app.widget';
import Header from './Header';
import Cookie from "react-cookie";
var $$ = Dom7;
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logo: '/styles/images/logo.png',
			location:[],
			survey: [],
			rating:[],
			smile: [],
			typeScreen: 0, // 0: Room, 1: Front Desk
			soundStatus: 1,
			color : ['#1ebfae', '#30a5ff', '#ffb53e', '#c7c700', '#f9243f', '#669999']
		}
	}
	componentWillMount(){
		Common.socket = io();
		Common.request({
			url: '/checkLogin',
			type: 'POST'
		}, function(res){
			Common.logs(res)
			if(res.status){
				Common.user = res.user;
				location.href="/#/home";
			} else {
				FWPlugin.loginScreen('.login-screen');
			}
		});
	}
	componentDidMount(){
		
	}
	componentWillReceiveProps(newProps){
		console.log('componentWillReceiveProps');
		console.log(newProps);
	}
	getSmile(eParent, eCircleChart, eColumnChart, text){
		var _=this;
		var location = [];
		var department = _.state.location;
		$('.list-room input:radio').each(function () {
			if ($(this).is(':checked')) {
				let id = $(this).val();
				for(let i= 0; i < department.length; i++){
					if(department[i].id == id && id != '-999'){
//						location.push(department[i].location.find(function(item){
//							return item;
//						}).id);
						for(let j = 0; j < department[i].location.length; j++){
							location.push(department[i].location[j].id);
						}
					}
				}
			}
		 });
		var from = $('.date-from').attr('data-date');
		var to = $('.date-to').attr('data-date');
		var opt = {
				date_from: from, 
				date_to: to, 
				location: location, 
				lang_id: '2'
		};
		Common.socket.emit('request_data', opt);
    }
	handleRealtime(data){
		var _=this;
		var res = JSON.parse(data.smile);
		var res1 = JSON.parse(data.rating);
		var length = res.length;
		var rating = [];
		var check = 0;
		for(var i = 0; i < length; i++){
			var obj = {
				id: res[i].id,
				name: res[i].name,
				value: Number(res[i].num),
				sum: (res[i].sum == 0 ? 1: Number(res[i].sum)),
				item:[]
			}
			rating.push(obj);
			if(_.state.rating.length > 0 && _.state.rating[i].value != obj.value){
				check = 1;
			}
		}
		if(_.state.rating.length > 0 && check == 0){
			return;
		}
//		_.setState({
//			rating: rating
//		});
		//'#frontdesk', '#fd_percent__', 'fd_rating_container', 'RATING'
		
		if(res1.length > 0){
			  var data = res1;
			  var length = data.length;
			  for(var i = 0; i < length; i++){
				  if(i < length){
					  rating[i].item = data[i].rating;
				   } else {
					  // rating[i].item = data[i].comment;
				   }
			  }
			
		  }
		 /* if(_.state.rating.length == 0){
			 _.setState({
			     rating: rating
		     });
	
		  }*/
		 
		  setTimeout(function(){
			_.drawCircleChart('#fd_percent__', rating);
			_.drawColumnChart('fd_rating_container', rating, 'RATING');
		  }, 200);
		_.setState({
			  rating: rating
		  });
		
	}
	drawCircleChart(element, data){
		var _=this;
		var length = data.length;
		for(var i = 0; i < length; i++){
			var percent = data[i].value*100/data[i].sum; 
			var classes = data[i].name.toLowerCase().replace(" ", '');
			$('.text__'+ i).text(data[i].name);
			$(element + i).attr('data-percent', percent.toFixed());
			$(element + i + ' .percent').text(percent.toFixed() + '%');
			$(element + i).easyPieChart({
				scaleColor : false,
				barColor : this.state.color[i]
			});
			$(element + i).data('easyPieChart').update(percent.toFixed());
		}
		 
	}
	/**
	 * Reference: https://www.highcharts.com/demo/column-drilldown
	 */
	drawColumnChart(elementNameId, data, title){
		var _=this;
		var arr = [];
		var length = data.length;
		for(var i = 0; i < length; i++){
			var obj = {};
	        obj.name = data[i].name;
	        obj.color = _.state.color[i];
	        obj.y = data[i].value;
			arr.push(obj);
		}
		Highcharts.chart(elementNameId, {
		    chart: {
		        type: 'column',
		        backgroundColor:'transparent'
		    },
		    title: {
		        text: title,
		        style: {
		            color: '#058cb3'
		        }
		    },
		    subtitle: {
		       // text: 
		    },
		    xAxis: {
		        type: 'category',
		        labels: {
	                style: {
	                    color: '#058cb3'
	                }
	            }
		    },
		    yAxis: {
		        title: {
		            text: 'Total rated',
		            style: {
			            color: '#058cb3'
			        }
		        }

		    },
		    legend: {
		        enabled: false
		    },
		    plotOptions: {
		        series: {
		            borderWidth: 0,
		            dataLabels: {
		                enabled: true,
		                format: '{point.y:.1f}'
		            }
		        }
		    },

		    tooltip: {
		        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
		    },

		    series: [{
		        name: 'Rating',
		        colorByPoint: true,
		        data: arr
		    }]
		});
	}
	getDepartment(){
		var _=this;
		var location = _.state.location;
		if(location.length > 0){
			_.getSmile('#frontdesk', '#fd_percent__', 'fd_rating_container', 'RATING');
			return;
		}
		Common.request({type:'GET', url: API.getDepartment()}, function(res){
			var length = res.length;
			var location = [];
			for(var i = 0; i < length; i++){
				if(res[i].id != '-999'){
					var obj = {
						id: res[i].id,
						name: res[i].name,
						location: res[i].location
					}
					location.push(obj);
				}
				
			}
			_.setState({
				location: location,
				typeScreen: 1
			});
			_.getSmile('#frontdesk', '#fd_percent__', 'fd_rating_container', 'RATING');
		});
	}
	getSearch(){
		var _ =this;
		if(_.state.typeScreen == 0){
			//_.getRoom();
		} else if(_.state.typeScreen == 1){
			//_.getDepartment();
			_.getSmile('#frontdesk', '#fd_percent__', 'fd_rating_container', 'RATING');
		}
	}
  switchSound(){
	  var _=this;
	  if(Common.isAndroid()){
		  Widget.callAndroid({cmd:'get', key:'IS_NOTIFY', value:'', action: 'ELC.getData'});
		  var time = setInterval(function(){
				 if(ELC.TRANSPORTER != null){
					 if(ELC.TRANSPORTER == -1){
						clearInterval(time);
						ELC.TRANSPORTER = null;  
						return;
					}
		            clearInterval(time);
		            var result = ELC.TRANSPORTER;
		            if(result == "1"){
		            	Widget.callAndroid({cmd:'set', key:'IS_NOTIFY', value:'0'});
		            	_.setState({soundStatus: "0"});
		            } else {
		            	Widget.callAndroid({cmd:'set', key:'IS_NOTIFY', value:'1'});
		            	_.setState({soundStatus: "1"});
		            }
		            ELC.TRANSPORTER = null;   
				 } 
			 }, 1);
	  }
  }
  logout(){
	  location.href="/#/login";
		Common.request({type:'POST', url: '/logout'}, function(res){
			if(res.status){
				FWPlugin.closeModal('.picker-filter');
				FWPlugin.closePanel();
				Cookie.remove("user");
				FWPlugin.loginScreen('.login-screen');
			}
		});
  }
  render() {
    return (
    	<div style={{'height': '100%'}}>
	    	<div className="statusbar-overlay"></div>
		    <div className="panel-overlay"></div>
		    <div className="panel panel-left panel-reveal">
			    <div className="content-block">
			      <p className="icon-user">
			      	<img style={{width: '100px'}} src="/styles/images/user.png"/>
			      </p>
			      <p>
			      	<i className="fa fa-user-circle" aria-hidden="true"></i>
			      	<span>ECOPARK</span>
			      </p>
			      <p>
				      <a href="#" onClick={this.switchSound.bind(this)}>
						<i className={this.state.soundStatus == "0"?"fa fa-bell-slash": "fa fa-bell"} aria-hidden="true"></i>
						<span>{this.state.soundStatus == "0"?"On Sound":"Off Sound"}</span>
		  			  </a>
			      </p>
			      <p>
			      	<a href="#" onClick={this.logout.bind(this)}>
			      		<i className="fa fa-sign-out" aria-hidden="true"></i> 
			      		<span>Logout</span>
			      	</a>
			      </p>
			    </div>
	        </div>
		    <Login />
		    <div className="views tabs toolbar-through">
			      <Picker location={this.state.location} smile={this.getSmile.bind(this, '#frontdesk', '#fd_percent__', 'fd_rating_container', 'RATING')} search={this.getSearch.bind(this)}/>
			      <FrontDesk color={this.state.color} 
    			 	location={this.state.location} 
    			 	logo={this.state.logo}
			      	rating={this.state.rating} 
		      		getLocation={this.getDepartment.bind(this)} />
			      <RatingDetail color={this.state.color} logo={this.state.logo} rating={this.state.rating} />
			      <Notify logo={this.state.logo}/>
			      <Tabbar  getLocation={this.getDepartment.bind(this)}/>
			</div>
    	</div>
    )
  }
};
class RatingDetail extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
    	    rating:[]
    	}
	}
    componentWillMount(){
    	
    }
    openPicker(){
    	FWPlugin.pickerModal('.picker-filter');
    }
    
    componentDidMount(){
    	var _=this;
    	setTimeout(function(){
    		var data = _.props.rating;
        	var length = data.length;
    		for(var i = 0; i < length; i++){
    			var element = '#rating__percent__'+ i;
    			var percent = data[i].value*100/data[i].sum; 
    			$(element+ ' .text__'+ i).text(data[i].name);
    			$(element+ ' .percent__'+ i).attr('data-percent', percent.toFixed());
    			$(element + ' .percent__' + i).text(percent.toFixed() + '%');
    			$(element).easyPieChart({
    				scaleColor : false,
    				barColor : _.props.color[i]
    			});
    			$(element).data('easyPieChart').update(percent.toFixed());
    		}
    	},2000);
    	
    }
  
   render() {
      return (
    		  <div id="rating_detail" className="view tab">
    		    <Header name="DETAIL RATING" logo={this.props.logo}/>
    			<div className="pages"> 
    				<div data-page="rating" className="page">
    					<div className="page-content rating_container">
	    					{this.props.rating.map(function(item, index){
								return (
									<div key={"rating_detail__" + index} className="row">
				    			       	  <div className="col-30">
				    			       	  	  <div className={"easypiechart percent__" + index} id={"rating__percent__" + index} 
				    			       	  	  		data-percent={(item.value*100/item.sum).toFixed()}>
				    								<span className="percent">{(item.value*100/item.sum).toFixed() + ' %'}</span>
				    								<span className={"text__" + index}>{item.name}</span>
				    						  </div>
				    			       	  </div>
				    			       	  <div className="col-70">
				    			       	  <div className="list-block media-list">	
		    			       	  			 <ul>
						    			       	{this.props.rating[index].item.map(function(subItem, idex){
				    								return (
				    										<li key={subItem.value + "__" + idex} className="item-content">
				    								          <div className="item-inner">
				    								        	  <div className="item-title-row">
				    								              <div className="item-title">{subItem.name}</div>
				    								              <div className={"item-after percent__" + idex}>{subItem.num}</div>
				    								        	  </div>
				    								          </div>
				    								        </li>	
				    								);
				    							})}
						    			       	</ul>
						    			      </div>
				    			       	  </div>
				    			       </div>
								);
							}, this)}
    					</div>
    				</div>
    			</div>
    		</div>
      );
   }
}
class RoomRating extends React.Component{
	constructor(props) {
		super(props);
		
	}
    componentWillMount(){
    }
    componentDidMount(){
    	var _ =this; 
		var ptrContent = $$('.pull-to-refresh-room');
		FWPlugin.initPullToRefresh(ptrContent) ;
		ptrContent.on('ptr:refresh', function (e) {
			_.props.getRoom();
		});
    }
    openPicker(){
    	FWPlugin.pickerModal('.picker-filter');
    }
    pickerClose(){
    	this.props.getRoom();
    }
	render() {
		return(
			<div id="roomrating" className="view view-main tab active">
				<div className="navbar">
					<div data-page="roomrating" className="navbar-inner">
						<div className="left">
							<img className="logo" src={this.props.logo} />
						</div>
						<div className="center sliding">RATING FOR ROOM</div>
						<div className="right">
							<a href="#" className="link icon-only open-picker" onClick={this.openPicker.bind(this)}> <i
								className="ios-icons">more_vertical</i></a>
						</div>
					</div>
				</div>
				
				<div className="pages navbar-through">
					<div className="page" data-page="dashboard">
						<div className="page-content pull-to-refresh-room" data-ptr-distance="50">
							<div className="content-block">
								<div className="row">
								    {this.props.rating.map(function(item, index){
								    	return(
								        		<div key={item.id + "__" + item.value} className={$(window).width() <= 320? "col-50": "col-33"}>
								    				<div className={"easypiechart percent__" + index} id={"percent__" + index}
								    					data-percent={(item.value*100/item.sum).toFixed()}>
								    					<span className="percent">{(item.value*100/item.sum).toFixed() + '%'} </span> 
								    					<span className={"text__" + index}>{item.name}</span>
								    				</div>
								    			</div>
								        	);
								    }, this)}
									
								</div>
							</div>
							<div className="content-block">
								<div id="rating_container" style={{'min-width': '310px'}, {'height': '400px'}, {'margin': '0 auto'}}></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
class FrontDesk extends React.Component{
	constructor(props) {
		super(props);
		
	}
    componentWillMount(){
    }
    componentDidMount(){
    }
    openPicker(){
    	FWPlugin.pickerModal('.picker-front-desk');
    }
    pickerClose(){
    	this.props.getLocation();
    }
	render() {
		return(
			<div id="frontdesk" className="view view-main tab active">
			<Header name="RATING" logo={this.props.logo}/>
				{/*<!-- Pages-->*/}
				<div className="pages">
					<div className="page" data-page="dashboard">
						<div className="page-content pull-to-refresh-frondesk" data-ptr-distance="50">
							<div className="content-block">
								<div className="row">
								    {this.props.rating.map(function(item, index){
								    	return(
								        		<div key={item.id + "__" + item.value} className="col-33">
								    				<div className={"easypiechart percent__" + index} id={"fd_percent__" + index}
								    					data-percent={(item.value*100/item.sum).toFixed()}>
								    					<span className="percent">{(item.value*100/item.sum).toFixed() + '%'} </span> 
								    					<span className={"text__" + index}>{item.name}</span>
								    				</div>
								    			</div>
								        	);
								    }, this)}
									
								</div>
							</div>
							<div className="content-block">
								<div id="fd_rating_container" style={{'min-width': '310px'}, {'height': '400px'}, {'margin': '0 auto'}}></div>
							</div>
						</div>

						{/*./end modal*/}
					</div>
				</div>
			</div>
		);
	}
}

class Survey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[]
		}
	}
    componentWillMount(){
    }
    componentDidMount(){
    	var _ =this; 
		var ptrContent = $$('.pull-to-refresh-survey');
		FWPlugin.initPullToRefresh(ptrContent) ;
		ptrContent.on('ptr:refresh', function (e) {
			_.props.getSurvey();
		});
    }
    
   render() {
      return (
		  <div id="survey" className="view tab">
			<div className="navbar">
				<div data-page="detail" className="navbar-inner">
					<div className="left sliding">
						<img className="logo" src={this.props.logo} />
					</div>
					<div className="center sliding">SURVEY ROOM</div>
					<div className="right">
						<a href="#" className="link icon-only open-picker"> <i
							className="ios-icons">more_vertical</i>
						</a>
					</div>
				</div>
			</div>
			<div className="pages navbar-through">
				<div data-page="survey" className="page">
					<div className="page-content list-survey pull-to-refresh-survey">
						<div className="pull-to-refresh-layer">
							<div className="preloader"></div>
							<div className="pull-to-refresh-arrow"></div>
						</div>
						{this.props.survey.map(function(item, index){
							return (
									<div key={item.sum + "__" + index} className="card">
								      <div className="card-header">{item.name}</div>
									  <div className="card-content">
									    <div className="card-content-inner">
							            	<div className="row center">
								           		<div className="col-25">
								            		<span className="percent___0">{item.excellent}</span>
								            	</div>
							            		<div className="col-25">
							            			<span className="percent___1">{item.good}</span>
							            		</div>
								           		<div className="col-25">
								            		<span className="percent___2">{item.average}</span>
								            	</div>
								          		<div className="col-25">
								        			<span className="percent___3">{item.poor}</span>
								            	</div>
								            </div>
									    </div>
									  </div>
									</div>
							);
						}, this)}
					</div>
				</div>
			</div>
		</div>
      );
   }
}
class Notify extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notifications:[{id: '-1', name: 'No content', time: '', status: '1', location: "", guest: "", room:"", checkin:"", checkout:""}],
		}
	}
    componentWillMount(){
//		this.checkNotify();
    }
    componentDidMount(){
    	var _=this;
    	Common.socket.on('receiveNotifyAll', (res)=>{
    		var notifications = [];
			if(res.status == 0){
				
			}
			var data = res.data || [];
			var length = data.length;
			var open = 0;
			for(var i = 0; i < length; i++){
				var obj = {
					id: data[i].id,
					name: data[i].name,
					location: data[i].location_name,
					department: data[i].speciality_name
				}
				if(obj.status == 0){
					open++;
				}
				notifications.push(obj);
			}
			if(notifications.length > 0){
				_.setState({
					notifications: notifications
				});
			} else {
				_.setState({
					notifications:[{id: '-1', name: 'No content', location: "", department: ""}]
				});
			}
			if(open > 0){
				$('.toolbar a[href="#notify"] i span').text(open);
				$('.toolbar a[href="#notify"] i span').removeClass("hidden");
			} else {
				$('.toolbar a[href="#notify"] i span').addClass('hidden');
			}
    	});
//    	this.checkNotify();
//    	setInterval(this.checkNotify.bind(this), 5000);
    }
    checkNotify(){
    	Common.request({url:API.getNotify()}, function(res){
			var notifications = [];
			if(!res.status){
				this.setState({
					notifications:[{id: '-1', name: 'No content', location: "", department: ""}]
				});
				return;
			}
			var data = res.data;
			var length = data.length;
			var open = 0;
			for(var i = 0; i < length; i++){
				var obj = {
					id: data[i].id,
					name: data[i].name,
					location: data[i].location_name,
					department: data[i].speciality_name
				}
				if(obj.status == 0){
					open++;
				}
				notifications.push(obj);
			}
			if(notifications.length > 0){
				this.setState({
					notifications: notifications
				});
			} else {
				this.setState({
					notifications:[{id: '-1', name: 'No content', location: "", department: ""}]
				});
			}
			if(open > 0){
				$('.toolbar a[href="#notify"] i span').text(open);
				$('.toolbar a[href="#notify"] i span').removeClass("hidden");
			} else {
				$('.toolbar a[href="#notify"] i span').addClass('hidden');
			}
    	}.bind(this));
    	
    }
    
    deleteClick(item){
		var _= this;
		var $this = ReactDOM.findDOMNode(this.refs["noty__" + item.id]);
		var arr = [];
		arr.push(item.id);
		FWPlugin.confirm('Are you sure?', 'eSMILE SUPERVISOR', function () {
	   		var obj = {
	   			id: arr
	   	  };
		 Common.request({url: API.deleteNotify(), data: obj, type: 'GET'}, function(response){
			 if(response.status == "1"){
				// $("#noty__" + item.id).remove();
				 _.checkNotify()
			 }
		 });
		});
	}
    rederHtml(obj){
    	var badge = <span className="badge color-green"></span>;
    	var location = <div className="item-text">
							<i className="fa fa-map-marker" aria-hidden="true"></i> {obj.location}
						</div>;
		var department =  <div className="item-text">
					    	<i className="fa fa-home" aria-hidden="true"></i> {obj.department}
					      </div>;	     
		if(obj.status == 1){
    		badge = <span className="badge"></span> 
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
				          <div className="item-title">{obj.name} </div>
				          <div className="item-after">
								{badge}
				          </div>
				        </div>
				        {obj.department != "" ? department : ""}
						{obj.location != "" ? location : ""}
				      </div>
				    </a>
				  </div>
				  <div className="swipeout-actions-right">
						{swipeout}
				  </div>
				</li>;
		return (tmp);
	}
	checkAll(){
		
	}
	deleteAll(){
		var _=this;
		var arr = [];
		FWPlugin.confirm('Are you sure delete all?', 'eSMILE SUPERVISOR', function () {
			var notify = _.state.notifications
			for(var i = 0;i < notify.length; i++){
				arr.push(notify[i].id);
			}
	   		var obj = {
	   			id: [-1]
	   	  };
		 Common.request({url: API.deleteNotifyAll(), data: obj, type: 'GET'}, function(response){
			 if(response.status == "1"){
				 _.checkNotify()
			 }
		 });
		});
	}
	
	render(){
		return (
			<div id="notify" className="view tab">
		        <div className="pages navbar-fixed">
		          <div data-page="notify" className="page">
		            <div className="navbar">
			          <div data-page="notify" className="navbar-inner">
			            <div className="left sliding">
					         <a href="#" data-panel="left" className="open-panel">
								<img className="logo" src={this.props.logo} />
							</a>
			            </div>
			            <div className="center sliding">NOTIFICATIONS</div>
			            <div className="right">
				            <a href="#" onClick={this.deleteAll.bind(this)} className="tab-link"> <i
									className="ios-icons color-red">trash</i> </a>
				          
			            </div>
			          </div>
			        </div>
		            <div className="page-content">
		              <div className="list-block media-list">
						  <ul>
						  	{this.state.notifications.map(this.rederHtml, this)}
						  </ul>
						</div>
		            </div>
		          </div>
		        </div>
	      </div>
		);
	}
}
class Picker extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			selectIndex: 0
		}
	}
	openPicker(){
    	
    }
    pickerClose(){
    	this.props.search();
    }
    componentWillMount(){
    }
    componentDidMount(){
    	var mySearchbar = FWPlugin.searchbar('.searchbar', {
    	    searchList: '.list-block-search',
    	    searchIn: '.item-title'
    	});   
    }
    departmentChanged(){
    	var _=this;
    	$('.list-room input:radio').each(function(index, item) {
			if ($(this).is(':checked')) {
				_.setState({selectIndex: index});
			}
		});
    	this.props.smile();
    }
	render(){
		return(
		  <div className="picker-modal picker-filter">
			<div className="toolbar">
				<div className="toolbar-inner">
					<div className="left">
					</div>
					<div className="right">
						<a href="#" className="close-picker">Done</a>
					</div>
				</div>
			</div>
			<div className="picker-modal-inner">
				<form data-search-list=".list-block-search"
					data-search-in=".item-title" className="searchbar searchbar-init">
					<div className="searchbar-input">
						<input type="search" placeholder="Search" /><a href="#"
							className="searchbar-clear"></a>
					</div>
					<a href="#" className="searchbar-cancel">Cancel</a>
				</form>
				<div className="searchbar-overlay"></div>
				<div className="content-block searchbar-not-found">
					<div className="content-block-inner">Nothing found</div>
				</div>
				<div className="list-block list-block-search searchbar-found">
					<ul className="list-room">
						{this.props.location.map(function(item, idx){
							return(
								<li key={'picker__' + item.id} onClick={this.departmentChanged.bind(this)}>
								  <label className="label-radio item-content">
									     <input type="radio" name="department-radio" defaultChecked={idx== this.state.selectIndex?'checked':''} value={item.id} />
									     <div className="item-inner">
									       <div className="item-title">{item.name}</div>
									     </div>
								   </label>
								 </li>
							);
						}, this)}
					</ul>
				</div>
				<div className="row">
					<div className="col-50">
						<div className="list-block">
							<div className="item-content">
								<div className="item-media">
									<i className="ios-icons icon-form-calendar">today</i>
								</div>
								<div className="item-inner">
									<div className="item-input">
										<input type="date" data-date-format="DD-MM-YYYY"
											placeholder="Date From" className="date-from" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-50">
						<div className="list-block">
							<div className="item-content">
								<div className="item-media">
									<i className="ios-icons icon-form-calendar">today</i>
								</div>
								<div className="item-inner">
									<div className="item-input">
										<input type="date" data-date-format="DD-MM-YYYY"
											placeholder="Date To" className="date-to" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>);
	}
}
class Tabbar extends React.Component {
   getLocation(){
	   this.props.getLocation();
   }
   getNotify(){
	   this.props.getNotify();
   }
   render() {
      return (
    		 <div className="toolbar tabbar tabbar-labels">
				<div className="toolbar-inner">
					<a href="#frontdesk" onClick={this.getLocation.bind(this)} className="tab-link active"> 
						<i className="fa fa-smile-o" style={{fontSize: '27px'}} aria-hidden="true"></i>
						<span className="tabbar-label">RATING</span></a>
					<a href="#rating_detail" onClick={this.getLocation.bind(this)} className="tab-link"> <i
						className="ios-icons">favorites_fill</i> <span className="tabbar-label">DETAIL RATING</span></a>
					<a href="#notify"
						className="tab-link"> <i className="ios-icons icons-bell">bell_fill<span className="badge bg-red hidden">0</span></i><span
						className="tabbar-label">NOTIFICATION</span></a>
				</div>
			</div>
      );
   }
}


export default App;
