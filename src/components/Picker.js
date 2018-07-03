import React, { Component } from 'react';
import FWPlugin from '.././common/app.plugin';
import API from '.././common/app.api';
import Common from '.././common/app.common';
class Picker extends React.Component{
	constructor(props) {
		super(props); 
	}
    componentWillMount(){
    	
    }
    componentDidMount(){
    
    }
	render(){
		return(
		  <div className="picker-modal picker-filter">
			<div className="toolbar">
				<div className="toolbar-inner">
					<div className="left"></div>
					<div className="right">
						<a href="#" className="close-picker" onClick={this.props.callback}>DONE</a>
					</div>
				</div>
			</div>
			<div className="picker-modal-inner">
				<div className="list-block list-block-search searchbar-found">
					<ul className="list-power">
						<li key={'picker__on'}>
						  <label className="label-checkbox item-content">
							     <input type="checkbox" name="room-checkbox" defaultChecked value="1" />
							     <div className="item-media">
							       <i className="icon icon-form-checkbox"></i>
							     </div>
							     <div className="item-inner">
							       <div className="item-title">{"TV ON"}</div>
							     </div>
						   </label>
						 </li>
						 <li key={'picker__off'}>
						  <label className="label-checkbox item-content">
							     <input type="checkbox" name="room-checkbox" defaultChecked value="0" />
							     <div className="item-media">
							       <i className="icon icon-form-checkbox"></i>
							     </div>
							     <div className="item-inner">
							       <div className="item-title">{"TV OFF"}</div>
							     </div>
						   </label>
						 </li>
						 <li key={'picker__disable'}>
						  <label className="label-checkbox item-content">
							     <input type="checkbox" name="room-checkbox" defaultChecked value="-2" />
							     <div className="item-media">
							       <i className="icon icon-form-checkbox"></i>
							     </div>
							     <div className="item-inner">
							       <div className="item-title">{"TV DISABLE"}</div>
							     </div>
						   </label>
						 </li>
					</ul>
				</div>
			</div>
		</div>);
	}
}
export default Picker;