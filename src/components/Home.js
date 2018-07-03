import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, hashHistory, IndexRoute  } from 'react-router-dom';
import API from '.././common/app.api';
import ReactDOM from 'react-dom';
import FWPlugin from '.././common/app.plugin';
import Common from '.././common/app.common';
import Widget from '.././common/app.widget';
import Login from './Login';
import Header from './Header';
import Trend from './Trend';
import Tabbar from './Tabbar';
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logo: '/styles/images/logo.png',
		}
	}
	componentWillMount(){	
		
	}
	componentDidMount(){
		var _=this;
		
	}
	componentWillReceiveProps(newProps){
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
				      <p><i className="ios-icons">person</i> {"ELCOM"}</p>
				      <p>
				      	<Link to={'/'} replace>
				      		<i className="ios-icons">logout</i> LOGOUT
				      	</Link>
				      </p>
				    </div>
			    </div>
			    <div className="views tabs toolbar-through">
			    	<Header logo={this.state.logo} name={'ELCOM'}/>
			    	<div className="view">
			    		<div className="pages">
				    		<div className="page tabs-swipeable-wrap">
							   <div className="tabs">
							      <div className="page-content tab tab-active">
							        <div className="block">
							          <p>Tab 1 content</p>
							        </div>
							      </div>
							    </div>
							</div>
			    		</div>
			    	</div>
			    	<Tabbar />
				</div>
				
	    	</div>
	    )
  }
};


export default Home;
