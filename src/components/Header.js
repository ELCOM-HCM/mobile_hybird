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
	deleteAll(){
		this.props.deleteAll();
	}
	render(){
		var right = <div className="right">
						<a href="#" className="link icon-only open-picker" onClick={this.openPicker.bind(this)}> <i
							className="ios-icons">more_vertical</i></a>
					</div>
		if(this.props.type != 0){
			right = <div className="right">
						<a href="#" onClick={this.deleteAll.bind(this)} className="tab-link"> <i
								className="ios-icons color-red">trash</i> </a>
					</div>
		}
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
	    					{right}
	    				</div>
	    			</div>
				</div>
		);
	}
}
export default Header;