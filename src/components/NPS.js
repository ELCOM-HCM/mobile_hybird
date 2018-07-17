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
			store:[],
			chart: null,
			nps:[
			     {
			    	 id: 1,
			    	 title: "Ban co hai long ve chat luong dich vu tai Viet Han khong",
			    	 type: "1",
			    	 data:[{id: 1, name: 'EXCELLENT', score: 10, respondent: 5, image:  ''}, 
							{id: 2, name: 'GOOD', score: 8, respondent: 5, image:  ''},
							{id: 3, name: 'AVERAGE', score: 6, respondent: 5, image: "Average.png"},
							{id: 4, name: 'POOR', score: 4, respondent: 5, image:  "Poor.png"},
							{id: 5, name: 'OTHER', score: 0, respondent: 5, image: "Other.png"}]
			     },
			     {
			    	 id: 2,
			    	 title: "Ket qua tham my",
			    	 type: "1",
			    	 data:[{id: 1, name: 'EXCELLENT', score: 10, respondent: 5, image:  "Excellent.png"}, 
							{id: 2, name: 'GOOD', score: 8, respondent: 5, image:  "Good.png"},
							{id: 3, name: 'AVERAGE', score: 6, respondent: 5, image: "Average.png"},
							{id: 4, name: 'POOR', score: 4, respondent: 5, image:  "Poor.png"},
							{id: 5, name: 'OTHER', score: 0, respondent: 5, image: "Other.png"}]
			     },
			     {
			    	 id: 3,
			    	 title: "Phi dich vu tai Viet Han",
			    	 type: "1",
			    	 data:[{id: 1, name: 'EXCELLENT', score: 10, respondent: 5, image:  "Excellent.png"}, 
							{id: 2, name: 'GOOD', score: 8, respondent: 5, image:  "Good.png"},
							{id: 3, name: 'AVERAGE', score: 6, respondent: 5, image: "Average.png"},
							{id: 4, name: 'POOR', score: 4, respondent: 5, image:  "Poor.png"},
							{id: 5, name: 'OTHER', score: 0, respondent: 5, image: "Other.png"}]
			     },
			     {
			    	 id: 4,
			    	 title: "Ban co muon gioi thieu ban be khong",
			    	 data:[{id: 1, name: 'YES', score: 10, respondent: 5, image:  "yes.png"}, 
							{id: 2, name: 'NO', score: 8, respondent: 5, image:  "no.png"},
						],
					type: "2"
			     }
			],
			nps_trend:[{date: 'dd-mm-yyyy', value: 10}, {date: 'dd-mm-yyyy', value: 20}, {date: 'dd-mm-yyyy', value: 2}],
			nps_num: 0,
			overview: []
		}
	}
	componentWillMount(){
	}
	async componentDidMount(){
		let store = await Common.requestAsync({type:'GET', data:{id: Common.user == null? '-1' : Common.user.user_id}, url: API.getStore()});
		this.setState({store: store});
		this._getNPS();
        //setInterval(this.getNPS.bind(this), 3000);
	}
	async _getNPS(){
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
				store_id: location
		};
		let data = await Common.requestAsync({type:'GET', url: API.getRatingService(), data:opt});
		if(this.refs.nps){
			this.setState({nps:data});
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
		var opt = {
				date_from: from, 
				date_to: to, 
				store: this.state.store.map(x=>x.id), 
				langid: Common.lang_id
		};
		let data = await Common.requestAsync({type:'GET', url: API.getServiceOverview(), data:opt});
		let arrPercent = data.map(x=>{
			let obj = {
					name: x.rating_name,
					data:[]
			};
			for(let i = 0; i < x.data.length; i++){
				let tmp = {
						name: x.data[i].name + " Sao",
						y: 0
				};
				if(Number(x.data[i].sum) > 0){
					tmp.y = Number(x.data[i].num)*100/Number(x.data[i].sum);
				}
				obj.data.push(tmp);
			}
			return obj;
		});
		//this.setState({overview: arrPercent});
		for(let i = 0; i < arrPercent.length; i++){
			this._drawChart('chart_' + i, arrPercent[i].data);
		}
	}
	_drawChart(container, data){
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
	render(){
		const {nps,nps_trend,nps_num} = this.state;
		function _renderSmile(data, type){
			return (
				data.map(function(item, index){
					return(
						<div className={type==1?"col-20":"col-50"} key={item.id + '__star'}>
							<div style={{"textAlign": "center", "marginTop": "3px"}}>
								{
									type=="1"?(<img width="45px" src={`/styles/images/${index+1}.png`}/>) : 
									(<img style={{width:'30px', height: '30px', 'borderRadius': '50%'}} src={`/styles/images/${index+1}_.png`}/>)
								}
								
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
					<Picker location={this.state.store} callback={this._getNPS.bind(this)}/>
					<div id="nps" className="view tab active">
						<div className="navbar-through">
							<Header name="SERVICE RATING"/>
							<div className="page" data-page="">
								<div className="page-content" data-ptr-distance="50">
									<div className="row">
										<div className="col-100">
											<div ref="nps" className="list-block media-list">
												<ul>
												      {nps.map(function(item, index){
															return(
																<li key={item.id + '__nps'}>
															      <div className="item-content">
															        <div className="item-inner">
															          <div className="item-title-row">
															            <div className="item-title" style={{"whiteSpace": "normal"}}>{item.title}</div>
															          </div>
															          <div className="item-subtitle">
																          <div className="row">
															          	   	{_renderSmile(item.data, item.type)}
															          	 </div>
															          </div>
															        </div>
															      </div>
															      <div id={`chart_${index}`} style={{minWidth: "100px", "height": "200px", "maxWidth": "600px","margin": "0 auto"}}></div>
															    </li>
															)
														}, this)}
												  </ul>
										    </div>
										</div>
									</div>
									<div className="content-block" id="chart_overview"></div>
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