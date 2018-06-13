import React, { Component } from 'react';
import FWPlugin from '.././common/app.plugin';
import API from '.././common/app.api';
import Common from '.././common/app.common';
class Picker extends React.Component{
	constructor(props) {
		super(props); 
		this.state = {
			location: []
		} 
	}
	openPicker(){
    	
    }
    pickerClose(){
    	
    }
    componentWillMount(){
    	
    }
   async componentDidMount(){
    	var mySearchbar = FWPlugin.searchbar('.searchbar', {
    	    searchList: '.list-block-search',
    	    searchIn: '.item-title'
    	});  
    	$('.date-from').on('change', function(){
			this.setAttribute(
			   "data-date", 
			   moment(this.value, "YYYY-MM-DD").format( this.getAttribute("data-date-format") ));
		});
		$('.date-to').on('change', function(){
			this.setAttribute(
			   "data-date", 
			   moment(this.value, "YYYY-MM-DD").format( this.getAttribute("data-date-format") ));
		});
    	$('.date-from').val(moment().subtract('days', 30).format('YYYY-MM-DD')); // get 30 day
    	$('.date-from').attr("data-date", moment(moment().subtract('days', 30), "YYYY-MM-DD").format($('.date-from').attr("data-date-format") ));
		$('.date-to').val(moment().format('YYYY-MM-DD')); // get today 
		$('.date-to').attr("data-date", moment(moment(), "YYYY-MM-DD").format($('.date-to').attr("data-date-format")));
		
    }
	render(){
		return(
		  <div className="picker-modal picker-filter">
			<div className="toolbar">
				<div className="toolbar-inner">
					<div className="left"></div>
					<div className="right">
						<a href="#" className="close-picker" onClick={this.props.callback}>Done</a>
					</div>
				</div>
			</div>
			<div className="picker-modal-inner">
				<form data-search-list=".list-block-search"
					data-search-in=".item-title" className="searchbar searchbar-init">
					<div className="searchbar-input">
						<input type="search" placeholder="Search" /><a href="#"
							className="searchbar-clear"></a>
					</div>
					<a href="#" className="searchbar-cancel">Cancel</a>
				</form>
				<div className="searchbar-overlay"></div>
				<div className="content-block searchbar-not-found">
					<div className="content-block-inner">Nothing found</div>
				</div>
				<div className="list-block list-block-search searchbar-found">
					<ul className="list-room">
						{this.props.location.map(function(item){
							return(
								<li key={'picker__' + item.id}>
								  <label className="label-checkbox item-content">
									     <input type="checkbox" name="room-checkbox" defaultChecked value={item.id} />
									     <div className="item-media">
									       <i className="icon icon-form-checkbox"></i>
									     </div>
									     <div className="item-inner">
									       <div className="item-title">{item.name}</div>
									     </div>
								   </label>
								 </li>
							);
						}, this)}
					</ul>
				</div>
				<div className="row">
					<div className="col-50">
						<div className="list-block">
							<div className="item-content">
								<div className="item-media">
									<i className="ios-icons icon-form-calendar">today</i>
								</div>
								<div className="item-inner">
									<div className="item-input">
										<input type="date" data-date-format="DD-MM-YYYY"
											placeholder="Date From" className="date-from" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-50">
						<div className="list-block">
							<div className="item-content">
								<div className="item-media">
									<i className="ios-icons icon-form-calendar">today</i>
								</div>
								<div className="item-inner">
									<div className="item-input">
										<input type="date" data-date-format="DD-MM-YYYY"
											placeholder="Date To" className="date-to" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>);
	}
}
export default Picker;