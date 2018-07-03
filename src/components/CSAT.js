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
				{id: 1, name: 'EXCELLENT', score: 10, respondent: 5, image:  "Excellent.png"}, 
				{id: 2, name: 'GOOD', score: 8, respondent: 5, image:  "Good.png"},
				{id: 3, name: 'AVERAGE', score: 6, respondent: 5, image: "Average.png"},
				{id: 4, name: 'POOR', score: 4, respondent: 5, image:  "Poor.png"},
				{id: 5, name: 'OTHER', score: 0, respondent: 5, image: "Other.png"}
			],
			csat_trend:[{date: 'dd-mm-yyyy', value: 10}, {date: 'dd-mm-yyyy', value: 20}, {date: 'dd-mm-yyyy', value: 15}],
			csat_num: 0
		}
	}
	componentWillMount(){
	}
	async componentDidMount(){
		let location = await Common.requestAsync({type:'GET', url: API.getLocation()});
		this.setState({location: location});
		let data = this.getCSAT();
		setInterval(this.getCSAT.bind(this), 3000);
	}
	async getCSAT(){
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
		let data = await Common.requestAsync({type:'GET', url: API.getCSAT(), data:opt});
		if(this.refs.csat){
			this.setState({csat:data.data_csat, csat_trend: data.csat_trend, csat_num: data.csat});
		}
		return data;
	}
	
	render(){
		const {csat_trend} = this.state;
		const {csat} = this.state;
		const {csat_num} = this.state;
		return (
			<div style={{'height': '100%'}}>
				<User />
				<div className="views tabs toolbar-through">
					<Picker location={this.state.location} callback={this.getCSAT.bind(this)}/>
					<div id="csat" className="view tab active">
						<div className="navbar-through">
							<Header name="CUSTOMER SATISFACTION"/>
							<div className="page" data-page="">
								<div className="page-content" data-ptr-distance="50">
									<div className="row">
										<div className="col-60">
											<div ref="csat" className="list-block media-list">
												<ul>
											      {csat.map(function(item, index){
													return(
														<li key={item.id + '__csat'}>
													      <div className="item-content">
													        <div className="item-media">
													        	<img width="45px" src={API.getPathContent() + item.image} />
													        </div>
													        <div className="item-inner">
													          <div className="item-title-row">
													            <div className="item-title">{renderHTML(item.name)}</div>
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
										<div className="col-40" style={{'textAlign':"center", 'marginTop': '25%'}}>
											<p style={{'color':'#fff'}}>CSAT</p>
											<CirclePie width={100} height={100} label="CSAT" labelColor='#408AE5' percent={csat_num}/>
										</div>
									</div>
									<div className="content-block">
										 <p style={{'color':'#fff'}}>CSAT Trend</p>
										 <Trend
										    smooth
										    autoDraw
										    autoDrawDuration={3000}
										    autoDrawEasing="ease-out"
										    data={csat_trend}
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
					<Tabbar index="1"/>
				</div>
			</div>
		);
	}
	
}
export default CSAT; 