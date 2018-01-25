import '../assets/stylesheets/base.scss';
import '../assets/stylesheets/css/app-tablet-esmile.css';
import 'react-rater/lib/react-rater.css'
import React, { Component } from 'react';
import cookie from "react-cookie";
import ReactDOM from 'react-dom';
import app from '.././common/app.plugin';
import Setting from '.././components/Setting';
import eCommon from '.././common/app.common';
import Rater from 'react-rater';
import Rating from 'react-rating';
//import $ from 'jquery';

class AppTablet extends Component{
	constructor(props) {
		super(props);
		this.state = {
			rid: '',
			host: '',
			host_content: '',
			api_get_content: '/eSurvey/ReceiveRatingCustomer?siteid=2&cmd=0002&lid=2',
			api_send_rating: '/eSurvey/ReceiveRatingCustomer?cmd=0003&siteid=2&lid=2&p0=[p0]&p1=[p1]',
			api_send_other: '/eSurvey/ReceiveRatingCustomer?cmd=0005&lid=2&p0=[p0]&siteid=2&text=[text]',
			logo: '',
			title: 'Share Your Opinion',
			button: ['Submit', 'Cancel'],
			btn_popup: ['Send', 'Close'],
			welcome: [
			          {id: 1, name: ''},
			          {id: 2, name: 'BẠN CÓ HÀI LÒNG VỚI WAKE UP 37'},
			          {id: 3, name: ''},
			          {id: 4, name: 'XIN TRÂN TRỌNG CẢM ƠN Ý KIẾN ĐÁNH GIÁ CỦA QUÝ KHÁCH'}
			],
			background: [{
					id: 1,
					url: "http://103.254.12.200:3119/content/esmile/ask_bg.jpg"
				}],
			text_rating: [
		           {id: 1, langid: 1, name:'Quý khách đánh giá chung về kì nghỉ ở Vinpearl như thế nào ?'},
		           {id: 2, langid: 1, name:'Tốc độ thực hiện dịch vụ nhận/trả phòng'},
		           {id: 3, langid: 1, name:'Thái độ nhân viên đón tiếp quý khách'},
		           {id: 4, langid: 1, name:'Dịch vụ vận chuyển ngoài khu nghỉ dưỡng(xe đón sân bay, tàu cao tốc, cáp treo, tuk-tuk...)'},
		           {id: 5, langid: 1, name:'Dịch vụ vận chuyển bên trong khu nghỉ dưỡng(xe điện, buggry...)'}
	       ],
	       languages: [],
	       smile:[]
		}
	}
	componentWillMount() {
		// get setting from cookie the first time
		if(cookie.load("setting") == undefined){
			var date = new Date();
			date.setFullYear(date.getFullYear() + 5); // set expires 5 year
			cookie.save("setting", JSON.stringify({ip: '103.254.12.200', port: '8083', lid: 1}), {expires: date});
		}
		var setting = cookie.load("setting");
		var host = 'http://' + setting.ip + ":" + setting.port;
		this.setState({
			host: host,
			host_content: 'http://' + setting.ip + ":3119/content/esmile/",
			api_get_content: host + '/eSurvey/ReceiveRatingCustomer?siteid=2&cmd=0002&lid=' + setting.lid,
			api_send_rating: host + '/eSurvey/ReceiveRatingCustomer?cmd=0003&siteid=2&lid='+ setting.lid+'&p0=[p0]&p1=[p1]',
			api_send_other: host + '/eSurvey/ReceiveRatingCustomer?cmd=0005&lid='+setting.lid+'&p0=[p0]&siteid=2&text=[text]',
			logo: "http://103.254.12.200:3119/content/esmile/ask_logo.png",
			background: [{id: 1 ,url: 'http://' + setting.ip + ":3119/content/esmile/" + 'ask_bg.jpg'}],
			smile:[
			        {id:1, type: 1, name: 'Excellent', url: host + '/eResource/smile/excellent.png', next: 4},
			        {id:2, type: 1, name: 'Good', url: host + '/eResource/smile/good.png', next: 4},
			        {id:3, type: 1, name: 'Fair', url: host + '/eResource/smile/normal.png', next: 4},
			        {id:4, type: 1, name: 'N/A', url: host + '/eResource/smile/notuse.png', next: 4},
			        {id:5, type: 1, name: 'Poor', url: host + '/eResource/smile/poor.png', next: 4},
			        {id:6, type: 1, name: 'Other', url: host + '/eResource/smile/other.png', next: -1}
			],
			languages: [
		           {id:1, url: host + '/eResource/language/vn.png'},
		           {id:2, url: host + '/eResource/language/english.png'}
		    ]
		});
	}
	
	initData(langid){
		var _=this;
		if(Number(langid) == 1){ // Vietnamese
			this.setState({
				title: 'Chia sẻ ý kiến của quý khách',
				btn_popup: ['Gửi', 'Đóng'],
				button: ['Gửi cảm nhận', 'Bỏ qua']
			});
		} 
		// get content
		$.get(this.state.api_get_content + '&langid=' + langid, function(response){
			var xml = $.parseXML(response);
			// get logo
			var xmlNodes = xml.getElementsByTagName('logo');
			var logo = $(xmlNodes)[0].textContent;
			// get welcome
			var node = $(xml).find('welcome').find('item');
			var length = node.length;
			var welcome = [];
			for(var i = 0; i < length; i++){
				var obj = {
					id: node.find('id')[i].textContent, 
					langid: langid, 
					name: node.find('name')[i].textContent
						
				}
				welcome.push(obj);
			}
			_.setState({
				logo: logo,
				welcome: welcome
			});
			// get rating
			var node = $(xml).find('rating').find('item');
			var length = node.length;
			var rating = [];
			for(var i = 0; i < length; i++){
				var obj = {
						id: node.find('id')[i].textContent, 
						langid: langid, 
						name: node.find('name')[i].textContent
						
				}
				rating.push(obj);
			}
			_.setState({
				logo: logo,
				text_rating: rating
			});
			
			// get language
			var node = $(xml).find('language').find('item');
			var length = node.length;
			var languages = [];
			for(var i = 0; i < length; i++){
				var obj = {
						id: node.find('id')[i].textContent, 
						url: _.state.host +  node.find('avatar')[i].textContent
				}
				languages.push(obj);
			}
			_.setState({
				languages: languages
			});
			
			// get smile
			var node = $(xml).find('smile').find('item');
			var length = node.length;
			var smile = [];
			for(var i = 0; i < length; i++){
				var next = i;
				if(next == length -1){
					next = -1;
				}
				var obj = {
						type: langid, 
						name: node.find('name')[i].textContent, 
						url: _.state.host + node.find('avatar')[i].textContent, 
						id: node.find('id')[i].textContent,
						next: next
						
				}
				smile.push(obj);
			}
			_.setState({
				smile: smile
			});
			// get background
//			var node = $(xml).find('background').find('item');
//			var length = node.length;
//			var bg = [];
//			for(var i = 0; i < length; i++){
//				var obj = {
//					id: node.find('id')[i].textContent,
//					url: _.state.host_content + node.find('value')[i].textContent
//				}
//				bg.push(obj);
//			}
		});
	}
	componentDidMount(){
		var langid = this.props.langid;
		//this.initData(langid);
		
	}
	changeLanguage(langid){
		this.initData(langid);
		var today = new Date();
		today.setFullYear(today.getFullYear() +  5);
		cookie.save("langid", langid, {
			 expires: today
		});
	}
	sendOther(rid, opinion){
		var url = this.state.api_send_other.replace('[p0]', rid).replace('[text]', opinion);
		$.get(url, function(response){
			console.log('>> Send rating other status: ' + response);
		});
	}
	sendRating(prid, rid){
		var url = this.state.api_send_rating.replace('[p0]', prid).replace('[p1]', rid);
		$.get(url, function(response){
			console.log('>> Send rating status: ' + response);
		});
	}
	
	render(){
		return (
			<div style={{'height': '100%'}}>
		    	<div className="statusbar-overlay"></div>
			    <div className="panel-overlay"></div>
			     <div className="views">
				    <div className="view view-main">
				      <div className="pages">
				      	  <Slide_Large  background={this.state.background} />
					      <Page_1
				      	  		    appSmileSelect={this.props.appSmileSelect}
				      	  		    sendOther={this.sendOther.bind(this)} 
				      	  			sendRating={this.sendRating.bind(this)} 
				      	  			title={this.state.title} 
				      	  			button={this.state.btn_popup} 
				      	  			text={this.state.welcome} 
				      	  			ip={this.state.host} 
				      	  			logo={this.state.logo} 
				      	  			smile={this.state.smile}
				      	  			languages = {this.state.languages}
				      	  			changeLanguage={this.changeLanguage.bind(this)}
				      	  			text_rating={this.state.text_rating}/>  
				      	  <Page_4 text={this.state.welcome[3].name} logo={this.state.logo} />
				      </div>
				    </div>
				</div>
	    	</div>
		);
	}
}


class Page_1 extends React.Component {
	constructor(props){
		super(props);
		this.state = {
	       languages: [],
	       text_rating: [],
	       pages:[]
		}
	}
   componentWillReceiveProps(){
   }
   componentDidMount(){
	   
   }
   itemClick(item, event){
	   var _= this;
	   var $this = ReactDOM.findDOMNode(this.refs["item__" + item.id]);
	   eCommon.rippleEffect($this, event);
	   if(Number(item.next) == -1){
		   app.modal({
			    title:  this.props.title,
			    text: '',
			    afterText:  '<div class="item-input">'+
				                '<textarea id="opinion_text" rows="5" cols="50"></textarea>'+
				              '</div>',
			    buttons: [
			      {
			        text: this.props.button[1],
			      },
			      {
			        text: this.props.button[0],
			        onClick: function() {
			           if($('#opinion_text').val() != ""){
			        	   _.props.sendOther($('.slide-small .swiper-slide-active').attr('data-id'), $('#opinion_text').val());
			        	   _.props.appSmileSelect(item);
			           }
			        }
			      }
			    ]
			  })
	   } else {
		   this.props.sendRating(item.id, $('.slide-small .swiper-slide-active').attr('data-id'));
		   this.props.appSmileSelect(item);
	   }
   }
   changeLanguage(item, event){
	   var $this = ReactDOM.findDOMNode(this.refs["lang__" + item.id]);
	   eCommon.rippleEffect($this, event);
	   this.props.changeLanguage(item.id);
   }
   handleRate(obj){
	   console.log(obj.rating); // 
	   clearTimeout();
	   var id = 0;
	   switch(obj.rating){
	     case 1:
	    	 id = 5;
	    	 break;
	     case 2:
	    	 id = 3;
	    	 break;
	     case 3:
	    	 id= 2;
	    	 break;
	     case 4: 
	    	 id= 4;
	    	 break;
	     case 5: 
	    	 id= 1;
	    	 break;
	   }
	   setTimeout(function(){
		   $('.views').find('div[data-page="esmile_page_1"]').addClass('cached');
		   $('.views').find('div[data-page="esmile_page_4"]').removeClass('cached');
		   $.ajax({
			   url:"http://esmile.e-smile.vn:3000/ask/tablet/smile",
			   type:"POST",
			   data: {"key":"2077","id":id,"user_id":"47"},
		   	   success: function(response){
		   		   console.log(response);   
		   	   },
		   	   error: function(){
		   		   console.log("Fail");
		   	   }
		   });
	   }, 1000);
   }
   render() {
      return (
    		<div data-page="esmile_page_1" className="page" >
	          <div className="page-content">
	             <div className="container-items">
	             	 <Setting />
		             <div className="row">
						  <div className="col-60">
						  	<h2>{this.props.text[0].name}</h2>
						  </div>
						  <div className="col-20 pull-right logo">
						  	 <img src={this.props.logo}/>
						  </div>
					</div>
					 <div className="row text-welcome">
			             <div className="content-block">
			             	<h3>{this.props.text[1].name}</h3>
			             </div>
		             </div>
		             <div className="row row_item">
		             	{/*<Rater total={5} onRate={this.handleRate.bind(this)}>
		             	</Rater>*/}
		             	{/*<Rating
		             	  emptySymbol="fa fa-star-o fa-2x"
		             	  fullSymbol="fa fa-star fa-2x"
		             	/>*/}
		             </div>
	             </div>
	          </div>
	        </div>
      );
   }
}
class Page_2 extends React.Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
	}
    render() {
      return (
		  <div data-page="esmile_page_2" className="page cached">
            <div className="page-content">
			     <div className="container-items-p2">
				     <div className="row">
					  <div className="col-90">
					  	 <h3>{this.props.text}</h3>
					  </div>
					  <div className="col-10 logo">
					  	 <img src={this.props.logo}/>
					  </div>
					</div>
		            <div className="row row-item">
		            	{/*this.props.pages.map(function(item, index){
		            		return (
		            			<div key={item.id + '_' + item.langid} className="col-25">
		            				<a href="#" ref={"item_" + item.id} className="ripplelink" onClick={this.itemClick.bind(this, item)}>
		            					<img className="esmile-item" src={item.url} />
		            				</a>
		       	            </div>
		            		);
		            	}, this)*/}
		            	<ListItem className="col-25" rid={this.props.rid} pages={this.props.pages}/>
		            	<Button rid={this.props.rid} button={this.props.button}/>
		            </div>
			     </div>
            </div>
          </div>
      );
   }
}
class Page_3 extends React.Component {
   constructor(){
	   super();
   }
   componentDidMount(){
   }
   render() {
      return (
		  <div data-page="esmile_page_3" className="page cached">
            <div className="page-content">
	            <div className="container-items-p3">
		            <div className="row">
					  <div className="col-90">
					  	 <h3>{this.props.text}</h3>
					  </div>
					  <div className="col-10 logo">
					  	 <img src={this.props.logo}/>
					  </div>
					</div>
		            <div className="row row-item">
		            	{/*this.props.pages.map(function(item, index){
		            		return (
		            			<div key={item.id + '_' + item.langid} className="col-30">
		            				<a href={'#esmile_page_' + item.next }>
		            					<img className="esmile-item" src= {item.url} />
		            				</a>
		       	            </div>
		            		);
		            	}, this)*/}
		            	<ListItem rid={this.props.rid} className="col-30" pages={this.props.pages}/>
		            	<Button rid={this.props.rid} button={this.props.button}/>
		            </div>
		       </div>
            </div>
          </div>
      );
   }
}
class Page_4 extends React.Component {
   constructor(){
	   super();
   }
   render() {
      return (
		  <div data-page="esmile_page_4" className="page cached">
            <div className="page-content container-items-p4">
		        <div className="row">
		            <div className="content">
			            <img src= {this.props.logo} style={{width:"50%"}}/>
			  	 		<h3>{this.props.text}</h3>
		            </div>
		  	 		
		  	 	</div>
            </div>
          </div>
      );
   }
}
class ListItem extends React.Component{
	constructor(){
		super();
		
	}
	componentDidMount(){
		
	}
	itemClick(item, e){
	   var id = item.id;
	   var $this = $(ReactDOM.findDOMNode(this.refs["item_" + id]));
	   if($this.find(".check_round").length === 0){
		   $this.prepend("<span class='check_round' data-id='"+id+"'><i class='ios-icons check_round_fill'>check_round_fill</i></span>");
	   } else {
		   $this.find('.check_round').remove();
	   }
	   if($this.find(".ink").length === 0){
		   $this.prepend("<span class='ink'></span>");
	    }
	         
	    var ink = $this.find(".ink");
	    ink.removeClass("animate");
	     
	    if(!ink.height() && !ink.width()){
	        var d = Math.max($this.outerWidth(), $this.outerHeight());
	        ink.css({height: d, width: d});
	    }
	     
	    var x = e.pageX - $this.offset().left - ink.width()/2;
	    var y = e.pageY - $this.offset().top - ink.height()/2;
	     
	    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
	    
	    
    }
	render(){
		return(
			<div className="row">
				{this.props.pages.map(function(item, index){
	        		return (
	        			<div key={item.id + '_' + item.langid} className={this.props.className}>
	        				<a href="#" ref={"item_" + item.id} className="ripplelink" onClick={this.itemClick.bind(this, item)}>
	        					<img className="esmile-item" src={item.url} />
	        				</a>
	   	            </div>
	        		);
	        	}, this)}
			</div>
		);
	}
}

class Button extends React.Component {
	back(){
		   var $this = $(ReactDOM.findDOMNode(this.refs.btn_back));
		   $this.parent().parent().parent().find('span').remove();
	}
	send(){
		   var $this = $(ReactDOM.findDOMNode(this.refs.btn_send));
		   $this.parent().parent().parent().find('span').remove();
	}
	render(){
		return (
			<div className="row" style={{'width': '100%'}}>
				<div className="col-50">
		    		<a href="#esmile_page_1" className="button button-big button-round" ref="btn_back" onClick={this.back.bind(this)}>{this.props.button[1]}</a>
		    	</div>
		    	<div className="col-50">
		    		<a href="#esmile_page_4" className="button button-big button-round" ref="btn_send" onClick={this.send.bind(this)}>{this.props.button[0]}</a>
		    	</div>
			</div>
		);
	}
}

class Slide_Large extends React.Component {
	render(){
		var background = function(item){
			return(
			  <div key={item.id} className="swiper-slide">
	          	 <img src={item.url}/>
	          </div>
			);
		}
		return (
				<div className="background-slide">
			      <div className="slide-large swiper-container">
				      <div className="swiper-wrapper"> 
						  {this.props.background.map(background)}
				      </div>
			          <div className="large-swiper-pagination swiper-pagination hidden"></div>
			      </div>
	      	   </div>
		);
	}
}
class Slide_Small extends React.Component {
	render(){
		var textRating = function(item){
			return(
			  <div key={item.id +  "_" + item.langid} data-id={item.id} className="swiper-slide">
	          	 <h3>{item.name}</h3>
	          </div>
			);
		}
		return (
				<div className="">
			  	 <div className="promotion-slide">
				  	 <div className="button-direct">
					  	 <a className="prevButton rotate ripplelink" href="#"><i className="ios-icons">play_fill</i></a>
					  	 <a className="nextButton ripplelink" href="#"><i className="ios-icons">play_fill</i></a>
				  	 </div>
				      <div className="slide-small swiper-container">
				        <div className="swiper-wrapper">
				        	{this.props.text.map(textRating)}
				        </div>
				        <div className="small-swiper-pagination swiper-pagination"></div>
				      </div>
		      	  </div>
			  </div>	
		);
	}
}

export default AppTablet;