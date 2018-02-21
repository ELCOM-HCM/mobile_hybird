import '../assets/stylesheets/base.scss';
import '../assets/stylesheets/css/app-rating.css';
import React, { Component } from 'react';
import API from '.././common/app.api';
import ReactDOM from 'react-dom';
import FWPlugin from '.././common/app.plugin';
import Common from '.././common/app.common';
import Widget from '.././common/app.widget';
import Login from './Login';
import Header from './Header';
import Trend from './Trend';
var $$ = Dom7;
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logo: '/styles/images/logo.png',
			user: {},
			location:[],
			locationStorage: [],
			filter:[{id: 1, name:'Last 24h', type:'hour'}, {id: 2, name:'1 Month', type:'day'}, {id: 3,name:'2 Month', type:'day'}, {id: 4, name:'6 Month', type:'month'}, {id: 5, name:'This Year', type:'month'}, {id: 6, name:'Last Year', type:'month'}],
			ratingDetail: [],
			rating:[],
			smile: [],
			trend:[],
			employee:[],
			color : ['#1ebfae', '#30a5ff', '#ffb53e', '#c7c700', '#f9243f', '#669999']
		}
	}
	componentWillMount(){	
		
	}
	componentDidMount(){
		var _=this;
		Common.request({
			url: '/checkLogin',
			type: 'POST'
		}, function(res){
			Common.logs(res);
			if(res.status){
				Common.user = res.user;
				_.state.user = res.user;
				Widget.callAndroid({cmd:'set', key:'USER_ID', value: Common.user.user_id});
//				Widget.callAndroid({cmd:'set', key:'SERVER', value:'http://demo.e-smile.vn:19091/'});
				console.log("SEND USER_ID " + Common.user.user_id);
				// initial date
				var date = Common.getLast30Days();
				var today = new Date();
//				$('#date-from').val(moment().subtract('days', 30).format('YYYY-MM-DD')); // get 30 day
				$('.date-from').val(moment().format('YYYY-MM-DD')); // get today
				$('.date-to').val(moment().format('YYYY-MM-DD')); // get today
//				$('#date-from').attr(
//						   "data-date", 
//						   moment().subtract('days', 30).format( $('#date-from').attr("data-date-format") ));
				$('.date-from').attr(
						   "data-date", 
						   moment().format( $('.date-from').attr("data-date-format") ));
				$('.date-to').attr(
						   "data-date", 
						   moment().format( $('.date-from').attr("data-date-format")));
				_.getTrend();
				//_.getLocation();
				setInterval(function(){
					//_.getLocation();
				}, 5000);
			} else {
				location.href="/#/login";
				FWPlugin.loginScreen('.login-screen');
			}
		});
	}
	componentWillReceiveProps(newProps){
	}
	getTrend(){
		this.setState({
			location: this.state.filter
		});
		var id = '';
		var type = 'hour';
		var from = moment().subtract(24, 'hours').format('DD/MM/YYYY HH:mm:ss').replace(new RegExp('/', 'g'), '-');
		var to = moment().format('DD/MM/YYYY HH:mm:ss').replace(new RegExp('/', 'g'), '-');
		$('.list-room input:checkbox').each(function () {
			if ($(this).is(':checked')) {
				id = $(this).val();
			}
		 });
		switch(id){
			case 2:
				from = moment().subtract(1, 'months').format('DD/MM/YYYY HH:mm:ss').replace(new RegExp('/', 'g'), '-');
				to = moment().format('DD/MM/YYYY HH:mm:ss').replace(new RegExp('/', 'g'), '-');
				break;
			case 3: 
				from = moment().subtract(3, 'months').format('DD/MM/YYYY HH:mm:ss').replace(new RegExp('/', 'g'), '-');
				to = moment().format('DD/MM/YYYY HH:mm:ss').replace(new RegExp('/', 'g'), '-');
				break;
			case 4: 
				from = moment().subtract(6, 'months').format('DD/MM/YYYY HH:mm:ss').replace(new RegExp('/', 'g'), '-');
				to = moment().format('DD/MM/YYYY HH:mm:ss').replace(new RegExp('/', 'g'), '-');
				break;
			case 5: 
				from = moment().subtract(1, 'months').format('DD/MM/YYYY HH:mm:ss').replace(new RegExp('/', 'g'), '-');
				to = moment().format('DD/MM/YYYY HH:mm:ss').replace(new RegExp('/', 'g'), '-');
				break;
			case 6:
				from = moment().startOf('year').format('DD/MM/YYYY HH:mm:ss').replace(new RegExp('/', 'g'), '-');
				to = moment().format('DD/MM/YYYY HH:mm:ss').replace(new RegExp('/', 'g'), '-');
				break;
		}
		
		var opt = {
				date_from: from, 
				date_to: to, 
				lang_id: '2',
				type: type// hour, day, month,
		};
		var _=this;
		console.log(opt);
		Common.request({data: opt, url: API.getTrend()}, function(res){
			 _.linearRegresion('Excellent Customer Experience Trend', '#trend_excellent', [[1, 9], [2, 7], [3, 20]], '#4cd964');
			 _.linearRegresion('Good Customer Experience Trend','#trend_good', [[1, 9], [2, 15], [3, 45]], '#007aff');
			 _.linearRegresion('Average Customer Experience Trend', '#trend_average', [[1, 9], [2, 15], [3, 17]], '#ff9500');
			 _.linearRegresion('Poor Customer Experience Trend', '#trend_poor', [[1, 9], [2, 15], [3, 9]], '#ffcc00');
			 _.linearRegresion('Very Poor Customer Experience Trend', '#trend_verypoor', [[1, 9], [2, 15], [3, 5]], '#ff3b30');
		});
	}
	linearRegresion(title, id, data, color){
		$(id).highcharts({
		    chart: {
		      type: 'scatter',
		      zoomType: 'xy',
		      backgroundColor:'transparent'
		    },
		    title: {
		    	style: {
		            color: 'rgba(255,255,255,0.8)'
		        },
		      text: title
		    },
		    subtitle: {
		      text: ''
		    },
		    xAxis: {
		    	labels: {
	                style: {
	                    color: 'rgba(255,255,255,0.8)'
	                }
	            },
		      startOnTick: true,
		      endOnTick: true,
		      showLastLabel: true,
		      categories: ['26/01/2018', '27/01/2018', '28/01/2018', '29/01/2018', '30/01/2018', '31/01/2018', '01/02/2018', '02/02/2018', '26/01/2018']
		    },
		    yAxis: {
		    	labels: {
	                style: {
	                    color: 'rgba(255,255,255,0.8)'
	                }
	            },
		      title: {
		        text: 'Number',
		        style: {
		            color: 'rgba(255,255,255,0.8)'
		        }
		      }
		    },
		    plotOptions: {
		      scatter: {
		        marker: {
		          radius: 5,
		          states: {
		            hover: {
		              enabled: true,
		              lineColor: 'rgb(100,100,100)'
		            }
		          }
		        },
		        states: {
		          hover: {
		            marker: {
		              enabled: false
		            }
		          }
		        },
		        tooltip: {
		          headerFormat: '<b>{series.name}</b><br>',
		          pointFormat: '<b>{point.category}:</b> {point.x}'
		        }
		      }
		    },
		    series: [{
		      regression: true,
		      regressionSettings: {
		        type: 'polynomial',
		        color: color,
		        extrapolate: 5,
		        name: 'Trend'
		      },
		      name: 'Rating',
		      color: color,
		      data: data

		    }]
		  });
	}
	getRating(){
		var from = moment().subtract(24, 'hours').format('DD/MM/YYYY HH:mm:ss');
		var to = $('.date-to').attr('data-date') + ' ' + moment().format('HH:mm:ss');
		var opt = {
				date_from: from, 
				date_to: to, 
				lang_id: '2',
				type: 'hour'// hour, day, month,
		};
		console.log(opt);
		Common.request({data: opt, url: API.getTrend()}, function(res){
			
		});
	}
	getSmile(eParent, eCircleChart, eColumnChart, text){
		var _=this;
		var location = [];
		$('.list-room input:checkbox').each(function () {
			if ($(this).is(':checked')) {
				location.push($(this).val());
			}
		 });
		var from = $('.date-from').attr('data-date') + ' 06:00';
		var to = $('.date-to').attr('data-date') + ' 23:00';
		var opt = {
				date_from: from, 
				date_to: to, 
				location: location, 
				lang_id: '2',
				id:[],
		};
    	Common.request({data: opt, url: API.getSmile()}, function(res){
    		var length = res.length;
    		var rating = [];
    		var ratingDetail = [];
    		// check change data
    		for(var i = 0; i < length; i++){
    			var obj = {
    				id: res[i].id,
    				name: res[i].name,
    				value: Number(res[i].num),
    				sum: (res[i].sum == 0 ? 1: Number(res[i].sum)),
    				item:[]
    			}
    			if(i > 0){
    				opt.id.push(res[i].id);
    				ratingDetail.push(obj);
    			}
    			rating.push(obj);
    		}
    		
    		if(_.state.rating.length > 0 && length > 0 
        			&& rating[0].sum == _.state.rating[0].sum){
        			return;
        	}
    		_.setState({
    			rating: rating,
    			ratingDetail: ratingDetail
    		});
    	  _.drawCircleChart(eCircleChart, rating);
    	  _.drawColumnChart(eColumnChart, rating, text);
    	  // draw smile Detail Rating
    	  _.drawCircleChart('#rating__percent__', ratingDetail);
    	  Common.request({data: opt, url: API.getRating()}, function(res1){
			  if(res1.length > 0){
				  var data = res1;
				  var length = ratingDetail.length;
				  for(var i = 0; i < length; i++){
					  ratingDetail[i].item = data[i].rating;
				  }
				  _.setState({
					  ratingDetail: ratingDetail
		    	  });
			  }
		  });
       });
    }
	
	drawCircleChart(element, data){
		var _=this;
		var length = data.length;
		for(var i = 0; i < length; i++){
			var percent = data[i].value*100/data[i].sum; 
			var classes = data[i].name.toLowerCase().replace(" ", '');
			$(element+ ' .text__'+ i).text(data[i].name);
			$(element+ ' .percent__'+ i).attr('data-percent', percent.toFixed());
			$(element + ' .percent__' + i + ' .percent').text(percent.toFixed() + '%');
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
	getEmployee(){
		var _=this;
    	Common.request({url: API.getEmployee()}, function(res){
			  if(res.length > 0){
				  var data = res;
				  var length = data.length;
				  var employee = [];
				  var listID = [];
				  for(var i = 0; i < length; i++){
					  var obj = {
							 username: data[i].username,
							 name: data[i].name,
							 image: API.pathContent() + data[i].image,
							 smile: []
					  }
					  listID.push(data[i].id);
					  employee.push(obj);
				  }
				  _.setState({
					  employee: employee
		    	  });
				  	var location = [];
					$('.list-room input:checkbox').each(function () {
						if ($(this).is(':checked')) {
							location.push($(this).val());
						}
					 });
					var from = $('.date-from').attr('data-date') + ' 06:00';
					var to = $('.date-to').attr('data-date') + ' 23:00';
					var opt = {
							date_from: from, 
							date_to: to, 
							location: location, 
							lang_id: '2',
							user_id: listID,
					};
					Common.request({data: opt, type:'GET', url: API.getEmployeeCompare()}, function(res1){
						var length = res1.length;
						var location = [];
						var data = res1;
						for(var i = 0; i < length; i++){
							employee[i].smile = data[i].smile;
						}
						_.setState({
							 employee: employee
						});
						
					});
			  }
		  });
	}
	getLocation(){
		var _=this;
		if(_.state.locationStorage.length > 0){
			_.setState({
				location: _.state.locationStorage,
			});
			_.getSmile('#rating', '#fd_percent__', 'fd_rating_container', 'RATING');
			return;
		}
		Common.request({type:'GET', url: API.getLocation()}, function(res){
			_.setState({
				location: res,
				locationStorage: res
			});
			_.getSmile('#rating', '#fd_percent__', 'fd_rating_container', 'RATING');
			
		});
	}
	logout(){
		location.href="/#/login";
		Common.request({type:'POST', url: '/logout'}, function(res){
			if(res.status){
				FWPlugin.closeModal('.picker-filter');
				FWPlugin.closePanel();
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
				      <p><i className="ios-icons">person</i> {this.state.user.fullname}</p>
				      <p>
				      	<a href="#" onClick={this.logout.bind(this)}>
				      		<i className="ios-icons">logout</i> LOGOUT
				      	</a>
				      </p>
				    </div>
			    </div>
			    <Login />
			    <div className="views tabs toolbar-through">
				     <Picker location={this.state.location} />
				     <Trend color={this.state.color} logo={this.state.logo} trend={this.state.trend} />
			    	 <Rating color={this.state.color} 
	    			 	location={this.state.location} 
	    			 	logo={this.state.logo}
				      	rating={this.state.rating} 
			      		getLocation={this.getLocation.bind(this)} />
				      <RatingDetail color={this.state.color} logo={this.state.logo} rating={this.state.ratingDetail} />
				      
			    	  
				      <Employee color={this.state.color} logo={this.state.logo} employee={this.state.employee} />
				      <Notify logo={this.state.logo}/>
				      <Tabbar getEmployee={this.getEmployee.bind(this)} getLocation={this.getLocation.bind(this)}/>
				</div>
	    	</div>
	    )
  }
};

class Rating extends React.Component{
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
    	FWPlugin.pickerModal('.picker-filter');
    }
    pickerClose(){
    	this.props.getLocation();
    }
	render() {
		return(
			<div id="rating" className="view view-main tab">
				<div className="navbar-through">
					<Header name="RATING" logo={this.props.logo}/>
					<div className="page" data-page="dashboard">
						<div className="page-content" data-ptr-distance="50">
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
					</div>
				</div>
			</div>
		);
	}
}
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
    	}, 5000);
    	
    }
  
   render() {
      return (
    		  <div id="rating_detail" className="view tab">
    		  	<Header name="DETAIL RATING" logo={this.props.logo}/>
    			<div className="navbar-through">
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
				    								              <div className={"item-after percent__" + idex} style={{color: '#fff'}}>{subItem.num}</div>
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
class Employee extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			employee:[]
		}
	}
    componentWillMount(){
    }
    componentDidMount(){
    }
    getEmployee(){
    	var _=this;
    	Common.request({url: API.getEmployee()}, function(res){
			  if(res.length > 0){
				  var data = res;
				  var length = data.length;
				  var employee = [];
				  var listID = [];
				  for(var i = 0; i < length; i++){
					  var obj = {
							 username: data[i].username,
							 name: data[i].name,
							 image: API.pathContent() + data[i].image,
							 smile: []
					  }
					  listID.push(data[i].id);
					  employee.push(obj);
				  }
				  _.setState({
					  employee: employee
		    	  });
				  
			  }
		  });
    }
   render() {
      return (
		  <div id="employee" className="view tab">
		   <Header name="EMPLOYEE" logo={this.props.logo}/>
			<div className="navbar-through">
				<div data-page="employee" className="page">
					<div className="page-content">
						{this.props.employee.map(function(item, index){
							return (
									<div key={item.username} className="card">
								      <div className="card-header">
								      	<div className="row" style={{width: '100%'}}>
								      		<div className="col-15">
									      		<img style={{width: '35px', height:'35px', 'borderRadius': '50%'}} src={item.image}/>
								      		</div>
									      	<div className="col-85">
										      	<span>{item.name}</span>
									      	</div>
								      	</div>
								      		
								      </div>
									  <div className="card-content">
									    <div className="card-content-inner">
							            	<div className="row center">
							            		{this.props.employee[index].smile.map(function(subItem, idx){
							            			return (
							            					<div key={subItem.name} className="col-20">
											            		<span className={"percent__" + idx}>{subItem.num}</span>
											            	</div>
									            	);
							            		})}
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
    	Common.request({url:API.getNotify(), data: {user_id: Common.user == null? '-1' : Common.user.user_id}, type: 'GET'}, function(res){
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
		FWPlugin.confirm('Are you sure delete?', 'VietNam Airline', function () {
	   		var obj = {
	   			id: [-1],//arr,
	   			user_id: Common.user.user_id
	   	  };
		 Common.request({url: API.deleteNotify(), data: obj, type: 'GET'}, function(response){
			 if(response.status == "1"){
				 _.checkNotify();
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
		FWPlugin.confirm('Are you sure delete all?', 'VIETNAM AIRLINE', function () {
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
				 _.checkNotify()
			 }
		 });
		});
	}
	render(){
		return (
			<div id="notify" className="view tab">
				<Header name="NOTIFICATION" logo={this.props.logo}/>
		        <div className="navbar-fixed">
		          <div data-page="notify" className="page">
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
    handleClick(){
    	console.log('change');
    }
	render(){
		return(
		  <div className="picker-modal picker-filter">
			<div className="toolbar">
				<div className="toolbar-inner">
					<div className="left"></div>
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
								  <label className="label-checkbox item-content" onClick={this.handleClick}>
									     <input type="checkbox" name="room-checkbox" defaultChecked={true} value={item.id} />
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
   getEmployee(){
	   this.props.getEmployee();
   }
  
   getNotify(){
	   this.props.getNotify();
   }
   getTrend(){
	   console.log('get trend');
   }
   render() {
      return (
    		 <div className="toolbar tabbar tabbar-labels">
				<div className="toolbar-inner">
					<a href="#trend" onClick = {this.getTrend.bind(this)} className="tab-link active">
						<i className="fa fa-line-chart" style={{fontSize: '27px'}} aria-hidden="true"></i>
						<span className="tabbar-label">TREND</span>
					</a>
					<a href="#rating" onClick={this.getLocation.bind(this)} className="tab-link"> 
						<i className="fa fa-smile-o" style={{fontSize: '27px'}} aria-hidden="true"></i>
						<span className="tabbar-label">RATRING</span></a>
					<a href="#rating_detail" onClick={this.getLocation.bind(this)} className="tab-link"> <i
						className="ios-icons">favorites_fill</i> <span className="tabbar-label">DETAIL RATING</span></a>
					<a href="#employee" onClick={this.getEmployee.bind(this)} className="tab-link"> 
						<i className="fa fa-users" style={{fontSize: '27px'}} aria-hidden="true"></i>
						<span className="tabbar-label">EMPLOYEE</span></a>
					<a href="#notify"
						className="tab-link"> <i className="ios-icons icons-bell">bell_fill<span className="badge bg-red hidden">0</span></i><span
						className="tabbar-label">NOTIFICATION</span></a>
				</div>
			</div>
      );
   }
}


export default App;
