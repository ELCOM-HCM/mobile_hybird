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
class NPS extends Component{
	constructor(props) {
		super(props);
		this.state = {
			location:[],
			nps:[
				{id: 1, name: 'PROMOTERS', score: '0-6', respondent: 5, image: API.getPathContent() + "nps_1.png"}, 
				{id: 2, name: 'PASSIVES', score: '7-8', respondent: 5, image: API.getPathContent() + "nps_3.png"},
				{id: 3, name: 'DETRACTORS', score: '9-10', respondent: 5, image: API.getPathContent() + "nps_2.png"}
			]
		}
	}
	componentWillMount(){
	}
	async componentDidMount(){
		let location = await Common.requestAsync({type:'GET', url: API.getLocation()});
		this.setState({location: location});
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
		let nps = await Common.requestAsync({type:'GET', url: API.getLocation()});
		return nps;
	}
	render(){
		return (
			<div style={{'height': '100%'}}>
				<User />
				<div className="views tabs toolbar-through">
					<Picker location={this.state.location} callback={this.getNPS.bind(this)}/>
					<div id="nps" className="view view-main tab active">
						<div className="navbar-through">
							<Header name="NET PROMOTER SCORE"/>
							<div className="page" data-page="">
								<div className="page-content" data-ptr-distance="50">
									<div className="row">
										<div className="col-60">
											<div className="list-block media-list">
												<ul>
												      {this.state.nps.map(function(item, index){
															return(
																	<li key={item.id + '__nps'}>
																      <div className="item-content">
																        <div className="item-media">
																        	<img width="45px" src={item.image}/>
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
										<div className="col-40" style={{'textAlign':"center", 'marginTop': '10%'}}>
											<p style={{'color':'#fff'}}>NPS</p>
											<CirclePie width={100} height={100} label="" labelColor='#408AE5' percent={40}/>
										</div>
									</div>
									<div className="content-block">
										 <p style={{'color':'#fff'}}>NPS Trend</p>
										 <Trend
										    smooth
										    autoDraw
										    autoDrawDuration={3000}
										    autoDrawEasing="ease-out"
										    data={[0,2,5,9,5,10,3,5,0,0,21,8,2,9,10,0,2,5,9,5,10,3,5,0,0,21,8,2,9,10]}
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