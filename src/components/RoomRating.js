/**
 * 
 * @author DangTM R&D Department
 * @date Jul 2, 2017
 * @addr ELCOM-HCM
 * 
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Common from  ".././common/app.common";
import FWPlugin from '.././common/app.plugin';

class RoomRating extends Component{
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
    pickerClose(){
    	this.getRoom();
    }
    
    getRoom(){
		var _=this;
		FWPlugin.showIndicator();
		Common.request({type:'GET', url: API.getRoom()}, function(res){
			var length = res.length;
			var room = [];
			for(var i = 0; i < length; i++){
				var obj = {
					id: res[i].id,
					name: res[i].name
				}
				room.push(obj);
			}
			_.setState({
				location: room
			});
			_.getSmile('#roomrating', '#percent__', 'rating_container', 'RATING FOR ROOM');
			FWPlugin.hideIndicator();
		});
	}
    getSmile(eParent, eCircleChart, eColumnChart, text){
		var _=this;
		var location = [];
		$('.list-room input:checkbox').each(function () {
			if ($(this).is(':checked')) {
				location.push($(this).val());
			}
		 });
		var from = $('.date-from').attr('data-date');
		var to = $('.date-to').attr('data-date');
		var opt = {
				date_from: from, 
				date_to: to, 
				location: location, 
				lang_id: '2'
		};
    	Common.request({data: opt, url: API.getSmile()}, function(res){
    		var length = res.length;
    		var rating = [];
    		// check change data
    		var isChange = false;
    		if(_.state.rating.length > 0 && length > 0 
    			&& res[0].sum == _.state.rating[0].sum){
    			return;
    		}
    		for(var i = 0; i < length; i++){
    			var obj = {
    				id: res[i].id,
    				name: res[i].name,
    				value: Number(res[i].num),
    				sum: (res[i].sum == 0 ? 1: Number(res[i].sum)),
    				item:[]
    			}
    			rating.push(obj);
    		}
    		_.setState({
    			rating: rating
    		});
    	Common.drawCircleChart(eCircleChart, rating);
    	Common.drawColumnChart(eColumnChart, rating, text);
       });
    }
	render(){
		return (
				<div>
					<div className="navbar">
					<div data-page="roomrating" className="navbar-inner">
						<div className="left">
							<img className="logo" src={this.props.logo} />
						</div>
						<div className="center sliding">RATING FOR ROOM</div>
						<div className="right">
							<a href="#" className="link icon-only open-picker" onClick={this.openPicker.bind(this)}> <i
								className="ios-icons">more_vertical</i></a>
						</div>
					</div>
				</div>
				<div className="pages navbar-through">
					<div className="page" data-page="dashboard">
						<div className="page-content pull-to-refresh-room" data-ptr-distance="50">
							<div className="pull-to-refresh-layer">
								<div className="preloader"></div>
								<div className="pull-to-refresh-arrow"></div>
							</div>
							<div className="content-block">
								<div className="row">
								    {this.props.rating.map(function(item, index){
								    	return(
								        		<div key={item.id + "__" + item.value} className={$(window).width() <= 320? "col-50": "col-33"}>
								    				<div className={"easypiechart percent__" + index} id={"percent__" + index}
								    					data-percent={(item.value*100/item.sum).toFixed()}>
								    					<span className="percent">{(item.value*100/item.sum).toFixed() + '%'} </span> 
								    					<span className={"text__" + index}>{item.name}</span>
								    				</div>
								    			</div>
								        	);
								    }, this)}
									
								</div>
							</div>
							<div className="content-block">
								<div id="rating_container" style={{'min-width': '310px'}, {'height': '400px'}, {'margin': '0 auto'}}></div>
							</div>
						</div>
					</div>
				</div>
			</div>);
	}
}
export RoomRating default;