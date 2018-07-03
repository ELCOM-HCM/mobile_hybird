import React, { Component } from 'react';
import FWPlugin from '.././common/app.plugin';
import Common from '.././common/app.common';
import API from '.././common/app.api';
import Header from './Header.js';
import Trend from 'react-trend';
import User from './PannelUser';
import Tabbar from './Tabbar';
import Picker from './Picker';
import {Area, CirclePie, BarMetric} from 'react-simple-charts';
//import { Chart, Area, Axis, Series, Tooltip, Cursor, Line } from "react-charts";
import renderHTML from 'react-render-html';
class NPS extends Component{
	constructor(props) {
		super(props);
		this.state = {
			location:[],
			chart: null,
			nps:[
				{id: 1, name: 'PROMOTERS', score: '0-6', respondent: 5, image: "nps_1.png"}, 
				{id: 2, name: 'PASSIVES', score: '7-8', respondent: 5, image: "nps_3.png"},
				{id: 3, name: 'DETRACTORS', score: '9-10', respondent: 5, image: "nps_2.png"}
			],
			nps_trend:[{date: 'dd-mm-yyyy', value: 10}, {date: 'dd-mm-yyyy', value: 20}, {date: 'dd-mm-yyyy', value: 2}],
			nps_num: 0
		}
	}
	componentWillMount(){
	}
	async componentDidMount(){
		let location = await Common.requestAsync({type:'GET', url: API.getLocation()});
		this.setState({location: location});
		this.getNPS();
        setInterval(this.getNPS.bind(this), 3000);
	}
	async getNPS(){
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
				lang_id: Common.lang_id
		};
		let data = await Common.requestAsync({type:'GET', url: API.getNPS(), data:opt});
		console.log(data);
		if(this.refs.nps){
			this.setState({nps:data.data_nps.reverse(), nps_trend: data.nps_trend, nps_num: data.nps});
		}
		return data;
	}
	async getOverview(){
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
				lang_id: Common.lang_id
		};
		let data = await Common.requestAsync({type:'GET', url: API.getOverview(), data:opt});
		return data;
	}
	draw(){
		let _=this;
		var gaugeOptions = {
		    chart: {
		        type: 'solidgauge',
		        backgroundColor: null
		    },
		
		    title: null,
		
		    pane: {
		        center: ['50%', '85%'],
		        size: '140%',
		        startAngle: -90,
		        endAngle: 90,
		        background: {
		            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
		            innerRadius: '60%',
		            outerRadius: '100%',
		            shape: 'arc'
		        }
		    },
		
		    tooltip: {
		        enabled: false
		    },
		
		    // the value axis
		    yAxis: {
		        stops: [
		            [0.1, '#DF5353'], // green
		            [0.5, '#DDDF0D'], // yellow
		            [0.9, '#55BF3B'] // red
		        ],
		        lineWidth: 0,
		        minorTickInterval: null,
		        tickAmount: 2,
		        title: {
		            y: -70
		        },
		        labels: {
		            y: 16
		        }
		    },
		
		    plotOptions: {
		        solidgauge: {
		            dataLabels: {
		                y: 5,
		                borderWidth: 0,
		                useHTML: true
		            }
		        }
		    }
		};
		let chart = Highcharts.chart('container', Highcharts.merge(gaugeOptions, {
		    yAxis: {
		        min: -100,
		        max: 100,
		        title: {
		            text: ''
		        }
		    },
		
		    credits: {
		        enabled: false
		    },
		
		    series: [{
		        name: '',
		        data: [_.state.nps_num],
		        dataLabels: {
		            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
		                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
		                   '<span style="font-size:12px;color:silver">score</span></div>'
		        },
		        tooltip: {
		            valueSuffix: ' SCORE'
		        }
		    }]
		
		}));

		//this.setState({chart: chart});
		return chart;
	}
	render(){
		const {nps} = this.state;
		const {nps_trend} = this.state;
		const {nps_num} = this.state;
		return (
			<div style={{'height': '100%'}}>
				<User />
				<div className="views tabs toolbar-through">
					<Picker location={this.state.location} callback={this.getNPS.bind(this)}/>
					<div id="nps" className="view tab active">
						<div className="navbar-through">
							<Header name="NET PROMOTER SCORE"/>
							<div className="page" data-page="">
								<div className="page-content" data-ptr-distance="50">
									<div className="row">
										<div className="col-60">
											<div ref="nps" className="list-block media-list">
												<ul>
												      {nps.map(function(item, index){
															return(
																	<li key={item.id + '__nps'}>
																      <div className="item-content">
																        <div className="item-media">
																        	<img width="30px" src={API.getPathContent() + item.image}/>
																        </div>
																        <div className="item-inner">
																          <div className="item-title-row">
																            <div className="item-title">{(parseInt(item.score) > 8)?'Promoters':(parseInt(item.score) < 7?'Detractors':'Passives')}</div>
																          </div>
																          <div className="item-subtitle">
																          	<span>
																          		<i className="fa fa-star" aria-hidden="true"></i> 
																          		{item.score}
																          	</span>
																          	<span>
																          		<i className="fa fa-share-square" aria-hidden="true"></i> 
																          		{item.respondent}
																          	</span>
																          </div>
																        </div>
																      </div>
																    </li>
															)
														}, this)}
												  </ul>
										    </div>
										</div>
										<div className="col-40" style={{'textAlign':"center", 'marginTop': '10%'}}>
											
											<CirclePie width={100} height={100} label="NPS" labelColor='#408AE5' percent={nps_num}/>
										</div>
									</div>
									<div className="content-block">
										 <p style={{'color':'#fff'}}>NPS Trend</p>
										 <Trend
										    smooth
										    autoDraw
										    autoDrawDuration={3000}
										    autoDrawEasing="ease-out"
										    data={nps_trend}
										    gradient={['#42b3f4']}
										    radius={12}
										    strokeWidth={3}
										    strokeLinecap={'square'}
										  />
										 
									</div>
								</div>
							</div>
						</div>
					</div>
					<Tabbar index="2"/>
				</div>
			</div>
		);
	}
	
}
export default NPS; 