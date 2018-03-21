import '../assets/stylesheets/css/app-store.css';
import React, { Component } from 'react';
import FWPlugin from '.././common/app.plugin';
import Common from '.././common/app.common';
import API from '.././common/app.api';
import Header from './Header.js';
class Trend extends Component{
	constructor(props) {
		super(props);
	}
    componentWillMount(){
    	
    }
    componentDidMount(){
    	
    }
	render(){
		return(
			<div id="trend" className="view tab active">
				<div className="navbar-through">
				    <Header name="CUSTOMER EXPERIENCE" logo={this.props.logo}/>
					<div data-page="trend" className="page">
						<div className="page-content">
							<div id="trend_excellent" style={{'min-width': '310px'}, {'height': '400px'}, {'margin': '0 auto'}}></div>
							<div id="trend_good" style={{'min-width': '310px'}, {'height': '400px'}, {'margin': '0 auto'}}></div>
							<div id="trend_average" style={{'min-width': '310px'}, {'height': '400px'}, {'margin': '0 auto'}}></div>
							<div id="trend_poor" style={{'min-width': '310px'}, {'height': '400px'}, {'margin': '0 auto'}}></div>
							<div id="trend_verypoor" style={{'min-width': '310px'}, {'height': '400px'}, {'margin': '0 auto'}}></div>
							{/*<div className="list-block media-list">
								<ul>
									{this.props.trend.map(function(item, index){
										return(
												<li key={item.id + '__' + item.user_id}>
											      <a href="#" className="item-link item-content">
											        <div className="item-media"><i className="fa fa-tablet fa-3x" aria-hidden="true"></i></div>
											        <div className="item-inner">
											          <div className="item-title-row">
											            <div className="item-title">{item.name}</div>
											            <div className="item-after">
											            	<span className={item.isLogin == 1? "badge color-green": "badge"}></span>
											            </div>
											          </div>
											          <div className="item-subtitle">
											          <i className="fa fa-sign-in" aria-hidden="true"></i> 
											          	{item.login_by == "" ? "Nobody login" : item.login_by}
											          </div>
											        </div>
											      </a>
											    </li>
										)
									}, this)}
								</ul>
							</div>*/}
							
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Trend;
