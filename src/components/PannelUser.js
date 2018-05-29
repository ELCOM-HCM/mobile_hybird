import React, { Component } from 'react';
import FWPlugin from '.././common/app.plugin';
import Common from '.././common/app.common';
import {Link} from 'react-router-dom'; // recommend
import { Redirect } from 'react-router';
class Header extends Component{
	constructor(props) {
		super(props);
		this.state = {
			redirectToReferrer: false
		}
	}
    componentWillMount(){
    }
    componentDidMount(){
    }
    logout(){
    	let _=this;
		Common.request({type:'POST', url: '/logout'}, function(res){
			if(res.status){
				FWPlugin.closeModal('.picker-filter');
				FWPlugin.closePanel();
				FWPlugin.loginScreen('.login-screen');
				_.setState({redirectToReferrer: true});
			}
		});
	}
	render(){
		const { redirectToReferrer } = this.state;
		if (redirectToReferrer) {
      		return <Redirect to="/login" />;
    	}
		return(
				<div>
					<div className="statusbar-overlay"></div>
	    			<div className="panel-overlay"></div>
				    <div className="panel panel-left panel-reveal">
					    <div className="content-block">
					      <p className="icon-user">
					      	<img style={{width: '100px'}} src="/styles/images/user.png"/>
					      </p>
					      <p><i className="ios-icons">person</i>{Common.user.fullname}</p>
					      <p>
					      	<a onClick={this.logout.bind(this)}>
					      		<i className="ios-icons">logout</i> LOGOUT
					      	</a>
					      </p>
					    </div>
				    </div>
				</div>
		);
	}
}
export default Header;