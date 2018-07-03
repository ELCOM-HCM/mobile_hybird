import React, {Component} from 'react';
import User from './PannelUser';
import Header from './Header';
import FWPlugin from '.././common/app.plugin';
import groupArray from 'group-array';
import Common from '.././common/app.common';
import Picker from './Picker';
import { HashRouter as Router, Route, Link, hashHistory, IndexRoute  } from 'react-router-dom';
class Hotel extends Component{
	constructor(props){
		super(props);
		this.state = {
			ws: "http://172.16.9.185:8888/WS",
			room:[{
					serinumber: "702INGQ3W191",
					status: "1",
					idaddress: "172.18.19.30",
					room: "1705"
				},
				{
					serinumber: "710INSE3Q678",
					status: "0",
					idaddress: "172.16.9.15",
					room: "1001"
				}]
		}
	}
	componentWillMount(){
	}
	async componentDidMount(){
		let _=this;
		let room = await Common.requestAsync({type:'GET', url: _.state.ws + '/pmsfolio?action=getlistsmartcard'});
		this.setState({room: room}); //groupArray(room, 'room')
		var mySearchbar = FWPlugin.searchbar('.searchbar', {
    	    searchList: '.list-room-search',
    	    searchIn: '.item-title'
    	});  
    	setInterval(async function(){
    		let room = await Common.requestAsync({type:'GET', url: _.state.ws + '/pmsfolio?action=getlistsmartcard'});
    		let cb = [];
    		$('.list-power input[type="checkbox"]:checked').each((index, item)=>{
    			cb.push($(item).val());
    		})
    		let tmp = room.filter((x)=> cb.includes(x.status));
			_.setState({room: tmp}); //groupArray(room, 'room')
    	}, 3000);
	}
	filterRoom(){
		let cb = [];
		$('.list-power input[type="checkbox"]:checked').each((index, item)=>{
			cb.push($(item).val());
		});
		let {room} = this.state;
		let tmp = room.filter((x)=> cb.includes(x.status));
		this.setState({room: tmp});
	}
	handleClick(item){
	    let _=this;
		let status = 'OFF';
		let text = 'Do you want to POWER ON TV?';
		if(item.status == 1){
			status = 'ON';
			text = '<p>POWER OFF | REBOOT TV</p>'
					+'<p style="text-align:left">'
						+'<input type="radio" name="power-radio" id="turn_off" value="0" checked/> <label for="turn_off">TURN OFF</label>'
					+'</p>'
					+'<p style="text-align:left">'
						+'<input type="radio" name="power-radio" id="reboot" value="2"/> <label for="reboot">REBOOT</label>' 
					+'</p>'
		}
		FWPlugin.modal({
			    title:  'eHOTEL',
			    text: text,
			    buttons: [
				 {
				    text: '<i class="ios-icons">close</i> NO',
				    onClick: async function() {
				      return;
				    }
				  },
			      {
			        text: '<i class="ios-icons">check</i> YES',
			        onClick: async function() {
			        	if(item.status == 1){
			        		let status = $('input[name="power-radio"]:checked').val();
			        		await Common.requestAsync({type:'POST', url: _.state.ws + '/pmsfolio', data:{action:'updatestatus', status: status, serinumber:item.serinumber}});
			        		await Common.requestAsync({type:'GET', url: 'http://172.16.9.185:3120/sendTCP?status='+status+'&ip=' + item.idaddress});
			        	} else if(item.status == 0){
			        		await Common.requestAsync({type:'POST', url:_.state.ws + '/pmsfolio', data:{action:'updatestatus', status: "0", serinumber:item.serinumber}});
			        		await Common.requestAsync({type:'GET', url: 'http://172.16.9.185:3120/sendTCP?status=1&ip=' + item.idaddress});
			        	}
			        	let room = await Common.requestAsync({type:'GET', url: _.state.ws + '/pmsfolio?action=getlistsmartcard'});
			        	let cb = [];
			    		$('.list-power input[type="checkbox"]:checked').each((index, item)=>{
			    			cb.push($(item).val());
			    		})
			    		let tmp = room.filter((x)=> cb.includes(x.status));
			        	_.setState({room: tmp}); //groupArray(room, 'room')
			        }
			      }
			    ]
			 });
	}
	render(){
		const {room} = this.state;
		return(
			<div className="views">
				<div className="view">
					<div className="navbar-through">
						<Header name="ELCOM"/>
						<div className="page">
							<Picker callback={this.filterRoom.bind(this)}/>
							<form data-search-list=".list-room-search" data-search-in=".item-title" className="searchbar searchbar-init">
								<div className="searchbar-input">
									<input type="search" placeholder="Search" />
									<a href="#" className="searchbar-clear"></a>
								</div>
								<a href="#" className="searchbar-cancel">Cancel</a>
							 </form>
							 <div className="searchbar-overlay"></div>
							 <div className="content-block searchbar-not-found">
							      <div className="content-block-inner">Nothing found</div>
							 </div>
							 <div className="page-content">
							 	<div className="list-block list-room-search searchbar-found" style={{margin: 0}}>
							      <ul>
							         {room.map(function(item, index){
							         	 let button = '';
				       	    			 if(item.status == 1){
											button = <button onClick={this.handleClick.bind(this,item)} className="button button-round button-fill bg-orange">
											 	 <i className="fa fa-power-off" aria-hidden="true"></i> TV ON
									 	      </button>
											} else if(item.status == 0){
												button = <button href="#" onClick={this.handleClick.bind(this,item)} className="button button-round button-fill bg-orange">
													 	 <i className="fa fa-power-off" aria-hidden="true"></i> TV OFF
											 	      </button>
											} else if(item.status == -2){
												button = <button href="#" className="button button-round button-fill bg-orange disable">
													 	 <i className="fa fa-power-off" aria-hidden="true"></i> TV DISABLE
											 	      </button>
											} 
							         	return(
							         		<li key={item.serinumber} className={"item__" + item.serinumber}>
								     	    	 <div  className="item-content item-link">
									       	        <div className="item-inner" style={{'backgroundImage':'url()','paddingRight': '10px'}}>
									       	          <div className="item-title" style={{width:'100%'}}>
								     	    	 		<p><i className="fa fa-home color-orange" aria-hidden="true"></i> {"ROOM " + item.room}</p>
								     	    	 		<p><i className="fa fa-key color-orange" aria-hidden="true"></i> {item.serinumber}</p>
								     	    	 		<p><i className="fa fa-television color-orange" aria-hidden="true"></i> {item.idaddress}</p>
								     	    	 	   </div>
								     	    	 	   <p style={{'float':'right'}}>{button}</p>
									       	        </div>
								     	          </div>
									       	      {/*<div className="accordion-item-content">
									       	        <div>
											       	    <div className="timeline tablet-sides" style={{margin:0}}>
												       	  	<div className="list-block media-list list-warehouse">
											       	    		<ul style={{background:'transparent'}}>
												       	    		{room[key].map(function(x, index){
												       	    			 let button = '';
												       	    			 if(x.status == 1){
																			button = <a href="#"  
																				  className="button button-round button-fill bg-orange">
																			 	 <i className="fa fa-circle-o faa-burst animated" aria-hidden="true"></i> ON
																	 	      </a>
																			} else if(x.status == 0){
																				button = <a href="#" 
																						  className="button button-round button-fill bg-orange">
																					 	 <i className="fa fa-circle-o faa-burst animated" aria-hidden="true"></i> OFF
																			 	      </a>
																			} 
												       	    			return(
												       	    				<li key={x.serinumber} className="item-content">
																	             <div className="item-inner">
																		           <div className="item-title-row">
																		             <div className="item-title">
																		             	<i className="fa fa-key color-orange" aria-hidden="true"></i> {x.serinumber}
																		             </div>
																		           </div>
																		           <div className="item-subtitle">
																		           		<p className="">
																		           			<i className="fa fa-television color-orange" aria-hidden="true"></i> {x.idaddress}
																		           		   <div className="item-after" style={{float:'right'}}>
																			                 {button}
																			               </div>
																			            </p>
																		           </div>
																	             </div>
																	           </li>
												       	    			)
												       	    		}, this)}
											       	    		</ul>
											       	    	</div>
												       	</div>
									       	        </div>
									       	      </div>*/}
								     	    </li>
							         	);
							         }, this)} 
							      </ul>
							    </div>
							 </div>}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Hotel;