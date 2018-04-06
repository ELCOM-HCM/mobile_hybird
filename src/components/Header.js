import React, { Component } from 'react';
import FWPlugin from '.././common/app.plugin';
import {Link} from 'react-router-dom';
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
    openSide(event){
		FWPlugin.openPanel('left');
		$('.panel-overlay').on('click', function(){
			FWPlugin.closePanel();
		});
	}
	render(){
		return(
				<div>
					<div className="statusbar-overlay"></div>
	    			<div className="navbar">
	    				<div className="navbar-inner">
	    					<div className="left">
	    						<Link to={'/'} replace onClick={this.openSide.bind(this, event)} 
							  	    className="open-pannel open-left-panel link icon-only" data-panel="left">
	    							<img className="logo" src={this.props.logo} />
	    						</Link>
	    					</div>
	    					<div className="center">{this.props.name}</div>
	    					<div className="right">
	    						<Link to={'/'} replace className="link icon-only open-picker" onClick={this.openPicker.bind(this)}> <i
	    							className="ios-icons">more_vertical</i></Link>
	    					</div>
	    				</div>
	    			</div>
				</div>
		);
	}
}
export default Header;