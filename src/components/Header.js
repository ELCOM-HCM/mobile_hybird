import React, { Component } from 'react';
import FWPlugin from '.././common/app.plugin';
class Header extends Component{
	constructor(props) {
		super(props);
	}
    componentWillMount(){
    }
    componentDidMount(){
    }
    openPicker(){
    	FWPlugin.pickerModal('.picker-filter');
    }
	render(){
		return(
				<div>
					<div className="statusbar-overlay"></div>
	    			<div className="navbar">
	    				<div className="navbar-inner">
	    					<div className="left">
	    						<a href="#" data-panel="left" className="open-panel">
	    							<img className="logo" src={this.props.logo} />
	    						</a>
	    					</div>
	    					<div className="center">{this.props.name}</div>
	    					<div className="right">
	    						<a href="#" className="link icon-only open-picker" onClick={this.openPicker.bind(this)}> <i
	    							className="ios-icons">more_vertical</i></a>
	    					</div>
	    				</div>
	    			</div>
				</div>
		);
	}
}
export default Header;