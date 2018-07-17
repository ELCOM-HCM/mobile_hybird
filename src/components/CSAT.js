import React, { Component } from 'react';
import FWPlugin from '.././common/app.plugin';
import Common from '.././common/app.common';
import API from '.././common/app.api';
import Header from './Header.js';
import User from './PannelUser'; 
import Tabbar from './Tabbar';
import Picker from './Picker';
import Trend from 'react-trend';
import {Area, CirclePie, BarMetric} from 'react-simple-charts';
import renderHTML from 'react-render-html';
class CSAT extends Component{
	constructor(props) {
		super(props);
		this.state = {  
			location:[],
			csat:[
			     {
			    	 id: 1,
			    	 title: "Thái độ nhân viên vơi khách hàng",
			    	 data:[{id: 1, name: 'EXCELLENT',  respondent: 5, image:  "Smile-1531118308887.gif"}, 
							{id: 2, name: 'GOOD',  respondent: 5, image:  "Smile-1531118316046.gif"},
							{id: 3, name: 'AVERAGE', respondent: 5, image: "Smile-1531118321703.gif"},
							{id: 4, name: 'POOR',  respondent: 5, image:  "Smile-1531118327711.gif"},
							{id: 5, name: 'OTHER',  respondent: 5, image: "Smile-1531118332111.gif"}]
			     },
			     {
			    	 id: 2,
			    	 title: "Đồng phục phục vụ khách hàng",
			    	 data:[{id: 1, name: 'EXCELLENT', respondent: 5, image:  "Smile-1531118308887.gif"}, 
							{id: 2, name: 'GOOD',  respondent: 5, image:  "Smile-1531118316046.gif"},
							{id: 3, name: 'AVERAGE',  respondent: 5, image: "Smile-1531118321703.gif"},
							{id: 4, name: 'POOR',  respondent: 5, image:  "Smile-1531118327711.gif"},
							{id: 5, name: 'OTHER',  respondent: 5, image: "Smile-1531118332111.gif"}]
			     },
			     {
			    	 id: 3,
			    	 title: "Năng lực tư vấn của chuyên viên",
			    	 data:[{id: 1, name: 'EXCELLENT',  respondent: 5, image:  "Smile-1531118308887.gif"}, 
							{id: 2, name: 'GOOD',  respondent: 5, image:  "Smile-1531118316046.gif"},
							{id: 3, name: 'AVERAGE',  respondent: 5, image: "Smile-1531118321703.gif"},
							{id: 4, name: 'POOR',  respondent: 5, image:  "Smile-1531118327711.gif"},
							{id: 5, name: 'OTHER',  respondent: 5, image: "Smile-1531118332111.gif"}]
			     }
				
			],
			csat_trend:[{date: 'dd-mm-yyyy', value: 10}, {date: 'dd-mm-yyyy', value: 20}, {date: 'dd-mm-yyyy', value: 15}],
			csat_num: 0
		}
	}
	componentWillMount(){
	}
	async componentDidMount(){
		let location = await Common.requestAsync({type:'GET', data:{key:'-1', lang_id: 1, type: 1}, url: API.info()});
		this.setState({location: location.locations});
		let data = this._getRatingEmployee();
		//setInterval(this._getRatingEmployee.bind(this), 3000);
	}
	async _getRatingEmployee(){
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
				location: location, 
				employee: emplId,
				langid: 1
		};
		let ratingEmployee = await Common.requestAsync({type:'GET', url: API.getRatingEmployee(), data:opt});
		let data = ratingEmployee.filter(x=>Number(x.id) > 0);
	
		if(this.refs.csat){
			this.setState({csat: data});
		}
		let arrPercent = data.map(x=>{
			let obj = {
					name: x.title,
					data:[]
			};
			for(let i = 0; i < x.data.length; i++) {
				let sum = x.data.reduce((x, y)=>{
					return x + Number(y.respondent)
				}, 0);
				let tmp = {
						name: renderHTML(x.data[i].name),
						y: 0
				};
				if(Number(sum) > 0){
					tmp.y = Number(x.data[i].respondent)*100/sum;
				}
				obj.data.push(tmp);
			}
			return obj;
		});
		for(let i = 0; i < arrPercent.length; i++){
			this._drawPieChart('piechart_' + i, arrPercent[i].data);
		}
		
		this._getOverview();
		
	}
	async _getOverview(){
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
				employee: emplId,
				langid: 1
		};
		let statistic = await Common.requestAsync({type:'GET', url: API.getStatisticEmpl(), data:opt});
		let categories = statistic.map(x=>x.data);
		let series = [
		    {name: "Rất Hài Lòng", data:statistic.map(x=>x.excellent)}, // {name:'', data:[]}
		    {name: "Hài Lòng", data:statistic.map(x=>x.good)}, // {name:'', data:[]}
		    {name: "Bình Thường", data:statistic.map(x=>x.average)}, // {name:'', data:[]}
		    {name: "Không Hài Lòng", data:statistic.map(x=>x.poor)}, // {name:'', data:[]}
		    {name: "Khác", data:statistic.map(x=>x.other)} // {name:'', data:[]}
		];
		this._drawChart(categories,series);
	}
	_drawPieChart(container, data){
		Highcharts.chart(container, {
		    chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: null,
		        plotShadow: false,
		        type: 'pie',
		        backgroundColor: 'rgba(255,255,255,0)'
		    },
		    title: {
		        text: ''
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		    },
		    plotOptions: {
		    	 pie: {
		             allowPointSelect: true,
		             cursor: 'pointer',
		             dataLabels: {
		                 enabled: false
		             },
		             showInLegend: true
		         }
		    },
		    legend: {
		        layout: 'vertical',
		        align: 'right',
		        verticalAlign: 'middle',
		        itemStyle: {
		               color: '#fff'
		        }
		    },
		    series: [{
		        name: '',
		        data: data
		    }]
		});
	}
	_drawChart(categories, series){
		Highcharts.chart('chart', {
			chart: {
		        type: 'line',
		        backgroundColor: 'rgba(255,255,255,0)',
		        style: {
		            color: "#fff"
		        }
		    },
		    title: {
		        text: 'Đánh Giá Nhân Viên',
	        	style: {
	                color: '#fff'
	             }  
		    },

		    subtitle: {
		        text: ''
		    },

		    yAxis: {
		        title: {
		            text: 'Số Lượng Đánh Giá',
		            style: {
		                color: '#fff'
		             }     
		        },
		        labels: {
		            style: {
		               color: '#fff'
		            }
		         },
		         
		    },
		    xAxis: {
		    	labels: {
		            style: {
		               color: '#fff'
		            }
		         },
		         title: {
		             style: {
		                color: '#fff'
		             }            
		          },
		        categories: categories //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		    },
		    legend: {
		        layout: 'vertical',
		        align: 'right',
		        verticalAlign: 'middle',
		        itemStyle: {
		               color: '#fff'
		        }
		    },

		    plotOptions: {
		        series: {
		            label: {
		                connectorAllowed: false
		            },
		           
		        },
		        line: {
		            dataLabels: {
		                enabled: true
		            },
		            enableMouseTracking: false
		        }
		    },
		    series: series,
		    responsive: {
		        rules: [{
		            condition: {
		                maxWidth: 500
		            },
		            chartOptions: {
		                legend: {
		                    layout: 'horizontal',
		                    align: 'center',
		                    verticalAlign: 'bottom'
		                }
		            }
		        }]
		    }

		});
	}
	render(){
		const {csat_trend, csat, csat_num} = this.state;
		function _renderSmile(data){
			return (
				data.map(function(item, index){
					return(
						<div className="col-20" key={item.id + '__smile'}>
							<div style={{"textAlign": "center", "marginTop": "3px"}}>
								<img style={{'borderRadius': '50%', "width":"30px", "height": "30px"}}  src={API.getPathContent() + item.image}/> 
							</div>
							<p style={{"textAlign": "center","margin": "0px","color": "#fff"}}>{item.respondent}</p>
						</div>
					)
				},this)
			)
		}
		return (
			<div style={{'height': '100%'}}>
				<User />
				<div className="views tabs toolbar-through">
					<Picker location={this.state.location} callback={this._getRatingEmployee.bind(this)}/>
					<div id="csat" className="view tab active">
						<div className="navbar-through">
							<Header name="EMPLOYEE RATING"/>
							<div className="page" data-page="">
								<div className="page-content" data-ptr-distance="50">
									<div className="row">
										<div className="col-100">
											<div ref="csat" className="list-block media-list">
												<ul>
											      {csat.map((item, index)=>{
													return(
														<li key={item.id + '__csat'}>
													      <div className="item-content">
													        <div className="item-inner">
													          <div className="item-title-row">
													            <div className="item-title">{renderHTML(item.title)}</div>
													          </div>
													          <div className="item-subtitle">
													          	<div className="row">
													          	   {_renderSmile(item.data)}
													          	 </div>
													          	 <div id={`piechart_${index}`} style={{minWidth: "100px", "height": "200px", "maxWidth": "600px","margin": "0 auto"}}></div>
													          </div>
													        </div>
													      </div>
													    </li>
													 )
													}, this)}
												  </ul>
										    </div>
										</div> {/*end col-60*/}
									</div>
									<div className="content-block" id="chart">
									</div>
								</div>
							</div>
						</div>
					</div>
					<Tabbar index="1"/>
				</div>
			</div>
		);
	}
	
}
export default CSAT; 