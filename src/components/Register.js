/**
 * 
 * @author DangTM R&D Department
 * @date May 3, 2017
 * @addr ELCOM-HCM
 * 
 */
import React, {Component} from 'react';
import app from '.././common/app.plugin';
import cookie from "react-cookie";
import ReactDom from 'react-dom';
import eCommon from '.././common/app.common';
import API from '.././common/app.api';

class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
			location:[],
			languages:[]
		}
	}
	componentWillMount() {
		var _=this;
		var opt = {
			url: API.location(),
		}
		var location = [];
		eCommon.request(opt, function(response){
			var length = response.length;
			for(var i = 0; i < length; i++){
				var obj = {};
				obj.id = response[i].id;
				obj.name = response[i].name;
				location.push(obj);
			}
			_.setState({location: location});
		});
		
	}
	componentDidMount(){
		var register = cookie.load('register') || {ip: API.ip, port: API.port};
		$(ReactDom.findDOMNode(this.refs.register__ip)).val(register.ip);
		$(ReactDom.findDOMNode(this.refs.register__port)).val(register.port);
	}
	register(){
		var name = $(ReactDom.findDOMNode(this.refs.register__name)).val();
		var ip = $(ReactDom.findDOMNode(this.refs.register__ip)).val();
		var port = $(ReactDom.findDOMNode(this.refs.register__port)).val();
		var smartcard = $(ReactDom.findDOMNode(this.refs.register__smartcard)).val();
		var lid = $(ReactDom.findDOMNode(this.refs.register__lid)).val();
		if(ip != '' && port != '' && smartcard != '' && lid != ''){
			var opt = {
				url : API.register(),
				data : {key: smartcard, ip: '0.0.0.0', name: name},
				type : 'POST'
			}
			eCommon.request(opt, function(response){
				//if(Number(response.status) == 1){
					var date = new Date();
					date.setFullYear(date.getFullYear() + 5); // set expires 5 year
					cookie.save("register", JSON.stringify({key: smartcard, ip: ip, port: port, ip_device: '0.0.0.0'}), {expires: date});
					cookie.save("setting", JSON.stringify({ip: ip, port: port, lid: lid}), {expires: date});
					cookie.save("langid", '2');
					window.location.reload();
				//}
			})
		}
	}
	render(){
		return(
				<div data-page="login-screen" className="page no-navbar no-toolbar no-swipeback">
				  <div className="page-content login-screen-content">
				  	<img src="" />
				    <div className="login-screen-title">eHotel Smile</div>
				    <form>
				      <div className="list-block">
				        <ul>
					       <li className="item-content">
				            <div className="item-inner">
				              <div className="item-title label">Name</div>
				              <div className="item-input">
				                <input type="text" ref={'register__name'} name="name" placeholder="Name Device"/>
				              </div>
				            </div>
				          </li>
				          <li className="item-content">
				            <div className="item-inner">
				              <div className="item-title label">IP Server</div>
				              <div className="item-input">
				                <input type="text" ref={'register__ip'} name="ip" placeholder="IP Server"/>
				              </div>
				            </div>
				          </li>
				          <li className="item-content">
				            <div className="item-inner">
				              <div className="item-title label">Port</div>
				              <div className="item-input">
				                <input type="text" ref={'register__port'} name="port" placeholder="Port"/>
				              </div>
				            </div>
				          </li>
				          <li className="item-content">
				            <div className="item-inner">
				              <div className="item-title label">Smart Card</div>
				              <div className="item-input">
				                <input type="text" ref={'register__smartcard'} name="smartcard" placeholder="Smart Card"/>
				              </div>
				            </div>
				          </li>
				          <li>
					          <div className="item-content">
					            <div className="item-inner">
					              <div className="item-title label">Location</div>
					              <div className="item-input">
					              	 <div className="item-input">
				                          <select ref="location" className="list-location">
						                        {this.state.location.map(function(item){
						                        	return(<option key={item.id} value={item.id}>{item.name}</option>);
						                        })}
				                          </select>
				                      </div>
					              </div>
					            </div>
					          </div>
					        </li>
				        </ul>
				      </div>
				      <div className="list-block">
				        <ul>
				          <li><a href="#" onClick={this.register.bind(this)} className="item-link list-button">Register</a></li>
				        </ul>
				        <div className="list-block-label">
				          <p>Click Resgister to access us system</p>
				        </div>
				      </div>
				    </form>
				  </div>
				</div>   
		);
	}
	
}
export default Register;
