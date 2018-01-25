import '../assets/stylesheets/base.scss';
import '../assets/stylesheets/css/app-rating.css';
import React, { Component } from 'react';
import API from '.././common/app.api';
import ReactDOM from 'react-dom';
import FWPlugin from '.././common/app.plugin';
import Common from '.././common/app.common';
import Login from './Login';
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
			color : ['#1ebfae', '#30a5ff', '#ffb53e', '#c7c700', '#f9243f', '#669999']
		}
	}
	componentWillMount(){	
		Common.request({
			url: '/checkLogin',
			type: 'POST'
		}, function(res){
			Common.logs(res);
			if(res.status){
				Common.user = res.user;
				location.href="/#/home";
			} else {
				FWPlugin.loginScreen('.login-screen');
			}
		});
	}
	componentDidMount(){
		var _=this;
		// initial date
		var date = Common.getLast30Days();
		var today = new Date();
//		$('#date-from').val(moment().subtract('days', 30).format('YYYY-MM-DD')); // get 30 day
		$('.date-from').val(moment().format('YYYY-MM-DD')); // get today
		$('.date-to').val(moment().format('YYYY-MM-DD')); // get today
//		$('#date-from').attr(
//				   "data-date", 
//				   moment().subtract('days', 30).format( $('#date-from').attr("data-date-format") ));
		$('.date-from').attr(
				   "data-date", 
				   moment().format( $('.date-from').attr("data-date-format") ));
		$('.date-to').attr(
				   "data-date", 
				   moment().format( $('.date-from').attr("data-date-format") ));
		_.getRoom();
//		setInterval(function(){
//			_.getRoom();
//		}, 5000);

		
	}
	componentWillReceiveProps(newProps){
	}
	
	getSmile(eParent, eCircleChart, eColumnChart, text){
		var _=this;
		var location = [];
		$('.list-room input:checkbox').each(function () {
			if ($(this).is(':checked')) {
				location.push($(this).val());
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
    	Common.request({data: opt, url: API.getSmile()}, function(res){
    		var length = res.length;
    		var rating = [];
    		// check change data
//    		if(_.state.rating.length > 0 && length > 0 
//    			&& res[0].sum == _.state.rating[0].sum){
//    			return;
//    		}
    		for(var i = 0; i < length; i++){
    			var obj = {
    				id: res[i].id,
    				name: res[i].name,
    				value: Number(res[i].num),
    				sum: (res[i].sum == 0 ? 1: Number(res[i].sum)),
    				item:[]
    			}
    			rating.push(obj);
    		}
    		_.setState({
    			rating: rating
    		});
    	_.drawCircleChart(eCircleChart, rating);
    	_.drawColumnChart(eColumnChart, rating, text);
       });
    }
	
	drawCircleChart(element, data){
		var _=this;
		var length = data.length;
		for(var i = 0; i < length; i++){
			var percent = data[i].value*100/data[i].sum; 
			var classes = data[i].name.toLowerCase().replace(" ", '');
//			$(element+ ' .text__'+ i).text(data[i].name);
//			$(element+ ' .percent__'+ i).attr('data-percent', percent.toFixed());
//			$(element + ' .percent__' + i + ' .percent').text(percent.toFixed() + '%');
//			$(element + i).easyPieChart({
//				scaleColor : false,
//				barColor : this.state.color[i]
//			});
//			$(element + i).data('easyPieChart').update(percent.toFixed());
			$('.text__'+ i).text(data[i].name);
			$('.percent__'+ i).attr('data-percent', percent.toFixed());
			$('.percent__' + i + ' .percent').text(percent.toFixed() + '%');
			$('.percent__' + i).easyPieChart({
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
		            color: 'rgba(255,255,255,0.8)'
		        }
		    },
		    subtitle: {
		       // text: 
		    },
		    xAxis: {
		        type: 'category',
		        labels: {
	                style: {
	                    color: 'rgba(255,255,255,0.8)'
	                }
	            }
		    },
		    yAxis: {
		        title: {
		            text: 'Total rated',
		            style: {
			            color: 'rgba(255,255,255,0.8)'
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
	getRoom(){
		var _=this;
		//FWPlugin.showIndicator();
		Common.request({type:'GET', url: API.getRoom()}, function(res){
			var length = res.length;
			var room = [];
			for(var i = 0; i < length; i++){
				var obj = {
					id: res[i].id,
					name: res[i].name
				}
				room.push(obj);
			}
			_.setState({
				location: room,
				typeScreen: 0
			});
			_.getSmile('#roomrating', '#percent__', 'rating_container', 'RATING FOR ROOM');
			//FWPlugin.hideIndicator();
		});
	}
	getLocation(){
		var _=this;
		//FWPlugin.showIndicator();
		Common.request({type:'GET', url: API.getLocation()}, function(res){
			var length = res.length;
			var location = [];
			for(var i = 0; i < length; i++){
				var obj = {
					id: res[i].id,
					name: res[i].name
				}
				location.push(obj);
			}
			_.setState({
				location: location,
				typeScreen: 1
			});
			_.getSmile('#frontdesk', '#fd_percent__', 'fd_rating_container', 'RATING FOR FRONT DESK');
			//FWPlugin.hideIndicator();
		});
	}
	getSearch(){
		var _ =this;
		if(_.state.typeScreen == 0){
			_.getRoom();
		} else if(_.state.typeScreen == 1){
			_.getLocation();
		}
	}
	getSurvey(){
    	var _= this;
    	var location = [];
    	$('.list-room input:checkbox').each(function () {
    		if ($(this).is(':checked')) {
    			location.push($(this).val());
    		}
    	 });
    	var from = $('.date-from').attr('data-date');
    	var to = $('.date-to').attr('data-date');
    	var json = {
    			lang_id: "2",
    			date_from: from, 
    			date_to: to, 
    			location: location 
    	};
    	Common.request({url:API.getSurvey(), data: json}, function(res){
    		var length = res.length;
    		var data = [];
    		for(var i = 0; i < length; i++){
    			var obj = new Object();
    			 var sum = (Number(res[i].sum) == 0? 1: Number(res[i].sum));
    			 obj.name = res[i].name;
    			 obj.id = res[i].id;
    			 obj.excellent = (Number(res[i].excellent)*100/sum).toFixed() + ' %';
    			 obj.good = (Number(res[i].good)*100/sum).toFixed() + ' %';
    			 obj.average = (Number(res[i].average)*100/sum).toFixed() + ' %';
    			 obj.poor = (Number(res[i].poor)*100/sum).toFixed()+ ' %';
    			 obj.sum = sum;
    			 data.push(obj);
    		}
    		 _.setState({
	   			  survey: data
	   		  });
    	});
    }
  render() {
    return (
    	<div style={{'height': '100%'}}>
	    	<div className="statusbar-overlay"></div>
		    <div className="panel-overlay"></div>
		    <div className="panel panel-left panel-reveal">
		      <div className="content-block">
		        <p>Left panel content goes here</p>
		      </div>
		    </div>
		    <div className="panel panel-right panel-cover">
		      <div className="content-block">
		        <p>Right panel content goes here</p>
		      </div>
		    </div>
		    <Login />
		    <div className="views tabs toolbar-through">
			      <RoomRating color={this.state.color} 
			      			 rating={this.state.rating} 
			      			 logo={this.state.logo}
			      			 getRoom = {this.getRoom.bind(this)}/>
			      <Picker location={this.state.location} search={this.getSearch.bind(this)}/>
			      <FrontDesk color={this.state.color} 
    			 	location={this.state.location} 
    			 	logo={this.state.logo}
			      	rating={this.state.rating} 
		      		getLocation={this.getLocation.bind(this)} />
			      <Survey logo={this.state.logo} room={this.state.room} survey={this.state.survey} location={this.state.location} getSurvey={this.getSurvey.bind(this)}/>
			      <Notify logo={this.state.logo}/>
			      <Tabbar getRoom={this.getRoom.bind(this)} getLocation={this.getLocation.bind(this)} getSurvey = {this.getSurvey.bind(this)}/>
			</div>
    	</div>
    )
  }
};

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
							<div className="pull-to-refresh-layer">
								<div className="preloader"></div>
								<div className="pull-to-refresh-arrow"></div>
							</div>
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
    	var _ =this; 
		var ptrContent = $$('.pull-to-refresh-frondesk');
		FWPlugin.initPullToRefresh(ptrContent) ;
		ptrContent.on('ptr:refresh', function (e) {
			_.props.getLocation();
		});
    }
    openPicker(){
    	FWPlugin.pickerModal('.picker-front-desk');
    }
    pickerClose(){
    	this.props.getLocation();
    }
	render() {
		return(
			<div id="frontdesk" className="view view-main tab">
				<div className="navbar">
					<div data-page="frontdesk" className="navbar-inner">
						<div className="left sliding">
							<img className="logo" src={this.props.logo} />
						</div>
						<div className="center">RATING FOR FRONT DESK</div>
						<div className="right">
							<a href="#" className="link icon-only open-picker" onClick={this.openPicker.bind(this)}> <i
								className="ios-icons">more_vertical</i></a>
						</div>
					</div>
				</div>
				{/*<!-- Pages-->*/}
				<div className="pages navbar-through">
					<div className="page" data-page="dashboard">
						<div className="page-content pull-to-refresh-frondesk" data-ptr-distance="50">
							<div className="pull-to-refresh-layer">
								<div className="preloader"></div>
								<div className="pull-to-refresh-arrow"></div>
							</div>
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
		this.checkNotify();
    }
    componentDidMount(){
    	this.checkNotify();
    	setInterval(this.checkNotify.bind(this), 5000);
    }
    checkNotify(){
    	Common.request({url:API.getNotify()}, function(res){
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
					checkin: res[i].checkin,
					checkout: res[i].checkout,
					guest: res[i].guest,
					room: res[i].folio
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
					notifications:[{id: '-1', name: 'No content', time: '', status: '1', location: "", guest: "", room:"", checkin:"", checkout:""}]
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
		FWPlugin.confirm('Are you sure?', 'eHotel SUP MerPerle', function () {
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
//		var badge = <span className="badge bg-yellow">{obj.type}</span>;
    	var badge = <span className="badge color-green"></span>;
    	var time = <div className="item-text">
						<i className="fa fa-calendar" aria-hidden="true"></i> {obj.time}
					</div>;
    	var location = <div className="item-text">
							<i className="fa fa-map-marker" aria-hidden="true"></i> {obj.location}
				       </div>;
		var guest = <div className="item-text">
						<i className="fa fa-user" aria-hidden="true"></i> {obj.guest}
				     </div>;
		var room =  <div className="item-text">
				    	<i className="fa fa-home" aria-hidden="true"></i> {obj.room}
				    </div>	;	     
    	var checkin =  <div className="item-text">
					    	<i className="fa fa-sign-in" aria-hidden="true"></i> {obj.checkin}
					    </div>;
		var checkout = <div className="item-text">
				    	 <i className="fa fa-sign-out" aria-hidden="true"></i> {obj.checkout}
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
				          <div className="item-title">{obj.name} </div>
				          <div className="item-after">
								{badge}
				          </div>
				        </div>
						
						{obj.time != "" ? time : ""}
						{obj.location != "" ? location : ""}
						{obj.guest != "" ? guest : ""}
				        {obj.room != "" ? room : ""}
				        {obj.checkin != "" ? checkin: ""}
				        {obj.checkout != ""?checkout:""}
				      </div>
				    </a>
				  </div>
				  <div className="swipeout-actions-right">
						{swipeout}
				  </div>
				</li>;
		return (tmp);
	};
	checkAll(){
		
	}
	deleteAll(){
		var _=this;
		var arr = [];
		FWPlugin.confirm('Are you sure delete all?', 'eHotel SUP MerPerle', function () {
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
			            	<img className="logo" src={this.props.logo} />
			            </div>
			            <div className="center sliding">NOTIFICATIONS</div>
			            <div className="right">
				            <a href="#" onClick={this.deleteAll.bind(this)} className="tab-link"> <i
									className="ios-icons">trash</i> </a>
				           {/* <div className="toolbar tabbar tabbar-labels">
								<div className="toolbar-inner">
									<a href="#" onClick={this.checkAll.bind(this)} className="tab-link"> 
										<i className="ios-icons">circle</i>
										<span className="tabbar-label">Select all</span></a>
									
									<a href="#"
										className="tab-link"> <i className="ios-icons">redo</i><span
										className="tabbar-label">Cancel</span></a>
								</div>
							</div>*/}
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
	openPicker(){
    	
    }
    pickerClose(){
    	this.props.search();
    }
    constructor(props) {
		super(props);   
	}
    componentWillMount(){
    }
    componentDidMount(){
    	var mySearchbar = FWPlugin.searchbar('.searchbar', {
    	    searchList: '.list-block-search',
    	    searchIn: '.item-title'
    	});   
    }
    searchChange(){
    	if($('#checkbox-all').is(':checked')){
    		$('.list-room input:checkbox').each(function () {
    			if ($(this).is(':checked')) {
    				$(this).attr('checked', false);
    			}
    		 });
    	} else {
//    		$("input:checkbox").attr("checked",true);
//    		$('.list-room li').trigger('click');
//    		$('.list-room input:checkbox').each(function () {
//    			if (!$(this).is(':checked')) {
//    				$(this).attr('checked', true).change();
//    			}
//    			$(this).attr('checked', true)
//    		 });
    	}
    }
	render(){
		return(
		  <div className="picker-modal picker-filter">
			<div className="toolbar">
				<div className="toolbar-inner">
					<div className="left">
						{/*<label className="label-checkbox item-content" onClick={this.searchChange.bind(this)}>
							<input type="checkbox" id="checkbox-all" defaultChecked name="checkbox-all" />
							<div className="item-media">
								<i className="icon icon-form-checkbox"></i>
						     </div>
							<div className="item-inner" style={{float:'right', marginTop:'-22px', marginLeft:'30px'}}>select all</div>
						</label> */}
					</div>
					<div className="right">
						<a href="#" className="close-picker" onClick={this.pickerClose.bind(this)}>Done</a>
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
						{this.props.location.map(function(item){
							return(
								<li key={'picker__' + item.id}>
								  <label className="label-checkbox item-content">
									     <input type="checkbox" name="room-checkbox" defaultChecked value={item.id} />
									     <div className="item-media">
									       <i className="icon icon-form-checkbox"></i>
									     </div>
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
   getRoom(){
	   this.props.getRoom();
   }
   getSurvey(){
	  this.props.getSurvey();
   }
   getNotify(){
	   this.props.getNotify();
   }
   render() {
      return (
    		 <div className="toolbar tabbar tabbar-labels">
				<div className="toolbar-inner">
					<a href="#roomrating" onClick={this.getRoom.bind(this)} className="tab-link active"> <i
						className="ios-icons">star_fill</i><span
						className="tabbar-label">Room</span></a>
					<a href="#frontdesk" onClick={this.getLocation.bind(this)} className="tab-link"> 
						<i className="fa fa-smile-o" style={{fontSize: '27px'}} aria-hidden="true"></i>
						<span className="tabbar-label">Front Desk</span></a>
					<a href="#survey" onClick={this.getSurvey.bind(this)} className="tab-link"> <i
						className="ios-icons">favorites_fill</i> <span className="tabbar-label">Survey</span></a>
					<a href="#notify"
						className="tab-link"> <i className="ios-icons icons-bell">bell_fill<span className="badge bg-red hidden">0</span></i><span
						className="tabbar-label">Notifications</span></a>
				</div>
			</div>
      );
   }
}


export default App;
