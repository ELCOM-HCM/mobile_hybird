import React, { Component } from 'react';
import FWPlugin from '.././common/app.plugin';
import Common from '.././common/app.common';
import Cookie from "react-cookie";
import {Link} from 'react-router-dom'; // recommend
import { Redirect } from 'react-router';
class Header extends Component{
	constructor(props) {
		super(props);
		this.state = {
			redirectToReferrer: false,
			redirectToChange: false
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
	changeLanguage(e, id){
		e.preventDefault();
		Common.lang_id = id;
		var date = new Date();
		date.setFullYear(date.getFullYear() + 10); // set expires 10 year
		Cookie.save("lang_id", id, {expires: date});
		this.setState({redirectToChange: true});
	}
	render(){
		const { redirectToReferrer } = this.state;
		const { redirectToChange } = this.state;
		if (redirectToReferrer) {
      		return <Redirect to="/login" />;
    	}
    	if (redirectToChange) {
      		window.location.reload();
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
					      <p className="languages"><i className="fa fa-language" aria-hidden="true"></i>
					      	<span><img data-id="2" onClick={(e) => this.changeLanguage(e, "2")} src="/styles/images/en.png"/></span>
					      	<span><img data-id="1" onClick={(e) => this.changeLanguage(e, "1")} src="/styles/images/vn.png"/></span>
					      </p>
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