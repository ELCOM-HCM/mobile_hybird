import '../assets/stylesheets/css/app-store.css';
import React, { Component } from 'react';
import FWPlugin from '.././common/app.plugin';
import Common from '.././common/app.common';
import API from '.././common/app.api';
import Header from './Header.js';
class Store extends Component{
	constructor(props) {
		super(props);
		console.log(props);
	}
    componentWillMount(){
    	
    }
    componentDidMount(){
    	
    }
	render(){
		return(
			<div id="store" className="view tab">
				<div className="navbar-through">
				    <Header type="0" name="STORE" logo={this.props.logo}/>
					<div data-page="store" className="page">
						<div className="page-content">
							<div className="list-block media-list">
								<ul>
									{this.props.store.map(function(item, index){
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
							</div>
							
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Store;
