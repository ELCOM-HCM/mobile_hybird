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
class CSAT extends Component{
	constructor(props) {
		super(props);
		this.state = {
			location:[],
			csat:[
				{id: 1, name: 'EXCELLENT', score: 10, respondent: 5, image: API.getPathContent() + "Excellent.png"}, 
				{id: 2, name: 'GOOD', score: 8, respondent: 5, image: API.getPathContent() + "Good.png"},
				{id: 3, name: 'AVERAGE', score: 6, respondent: 5, image: API.getPathContent() + "Average.png"},
				{id: 4, name: 'POOR', score: 4, respondent: 5, image: API.getPathContent() + "Poor.png"},
				{id: 5, name: 'OTHER', score: 0, respondent: 5, image: API.getPathContent() + "Other.png"}
			]
		}
	}
	componentWillMount(){
	}
	async componentDidMount(){
		let location = await Common.requestAsync({type:'GET', url: API.getLocation()});
		this.setState({location: location});
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
		let csat = await Common.requestAsync({type:'GET', url: API.getLocation()});
		return csat;
	}
	
	render(){
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
											<div className="list-block media-list">
												<ul>
											      {this.state.csat.map(function(item, index){
													return(
														<li key={item.id + '__csat'}>
													      <div className="item-content">
													        <div className="item-media">
													        	<img width="45px" src={item.image} />
													        </div>
													        <div className="item-inner">
													          <div className="item-title-row">
													            <div className="item-title">{item.name}</div>
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
											<CirclePie width={100} height={100} label="CSAT" labelColor='#408AE5' percent={20}/>
										</div>
									</div>
									<div className="content-block">
										 <p style={{'color':'#fff'}}>CSAT Trend</p>
										 <Trend
										    smooth
										    autoDraw
										    autoDrawDuration={3000}
										    autoDrawEasing="ease-out"
										    data={[0,2,5,9,5,10,3,5,0,0,1,8,2,9,0]}
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