import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {postUser} from "./../action/dataUserActions.js";
import Paper from "material-ui/paper"; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const paper_style = {
	height:80,
	width: 40
}
class App extends Component{
	constructor(args) {
		super(args);
		this.state = {
			getName:"",
			getMobile:"",
			GetEmail:"",
			getCity:"",
			errorName:false,
			errorMobile:false,
			errorEmail:false,
			errorCity:false,
			arrayData: []
		};
	}

	name(e){
		let getusername = e.target.value;
		if(getusername.length > 0){
			this.setState({
				name:getusername
			});
		}
	}

	mobile(e){
		let getusermobile = e.target.value;
		if((/^\d{10}$/.test(getusermobile))){
			this.setState({
				mobile:getusermobile
			});
		}
	}

	email(e){
		let getuseremail = e.target.value;
		var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(getuseremail.match(mailformat))
		{
			this.setState({
				email:getuseremail
			});
		}
	}
	

	city(e){
		let getusercity = e.target.value;
		if(getusercity.length > 0){
			this.setState({
				city:getusercity
			});
		}
	}
    registersuccess(e){
    	e.preventDefault();
    	if(this.state.name && this.state.mobile && this.state.email && this.state.city){

			let objData = {
				id: this.state.arrayData.length + 0,
				name: this.state.name,
				phoneNumber: this.state.mobile

			};
			this.props.postUser(objData);
			this.state.arrayData.push(objData);
			this.setState({
				arrayData: this.state.arrayData
			});
						this.setState({
				errorName: false,
				errorMobile: false,
				errorCity:false,
				errorEmail: false
			}, () => {
				this.props.history.push("/srcdes");
			});
			
    	}
    	else if(this.state.name || this.state.mobile || this.state.email || this.state.city){
			this.setState({
				errorName: false,
				errorMobile: false,
				errorCity:false,
				errorEmail: false
			});
			
    	}
   
    	if(!this.state.name){
    		this.setState({
    			errorName: true
    		})
    	}
    	if(!this.state.mobile){
    		this.setState({
    			errorMobile: true
    		})
    	}

    	if(!this.state.email){
    		this.setState({
    			errorEmail: true
    		})
    	
    	}
    	if(!this.state.city){
    		this.setState({
    			errorCity: true
    		})
    	}
}

cancelAll() {

}

	render() {
		return (
			<MuiThemeProvider>
			 <div className="w3-container ">
			  	<div className="w3-row">
					<div className="w3-col s5 m5 l5">
					<form >
					    <div className="w3-panel w3-pale-black">

					    </div>
			          <div className="w3-row formpos">
			  	       <label className="w3-panel "> Sign up </label> 
			  	      </div>

			  	     
			  	     <div className="w3-row formpos">
			  	       <label> Name </label> &nbsp;
			  	       <input className="textbox nampos" type ="text" onChange={this.name.bind(this)} placeholder ="Name" /> 
			  	       
			  	       {(this.state.errorName) ? 
	        		   <label className="warning">Name must not be empty!</label>
	        		   :null
	        			}
			  	     </div>

			  	     <div className="w3-row formpos">
			  	       <label> Mobile </label> 
			  	       <input className="textbox nampos" type ="text" onChange={this.mobile.bind(this)} placeholder ="0-9" />
			  	       {(this.state.errorMobile) ?
			  	       	<label className="warning">Enter valid number</label>
			  	       	:null
			  	       }
			  	     </div>

			  	     <div className="w3-row formpos">
			  	       <label> Email </label> &nbsp;
			  	       <input className="textbox nampos" type ="text" onChange={this.email.bind(this)} placeholder ="abc@gmail.com" />
			  	        {(this.state.errorEmail) ?
			  	       	<label className="warning">Enter valid Email</label>
			  	       	:null
			  	       }
			  	     </div>

			  	     <div className="w3-row formpos">
			  	       <label> City </label> &nbsp;&nbsp;&nbsp;
                       <input className="textbox nampos" type ="text" onChange={this.city.bind(this)} placeholder ="Bangalore" />
                       {(this.state.errorCity) ?
			  	       	<label className="warning">Enter city</label>
			  	       	:null
			  	       }
			  	     </div>
			
			  	     <div className="w3-row ">
			  	   
			  	       <button className="w3-blue nampos" onClick={this.registersuccess.bind(this)}>Submit </button>
			  	   	   <button className="w3-blue nampos" onClick={this.cancelAll.bind(this)}>Cancel </button> 
			  	     </div>
			  	 
			</form>
					</div>
					<div className="w3-col s7 m7 l7 backgroundimg" style={{minHeight: "100vh"}}>
					</div>
			  	</div>
			 
			 </div>
			 </MuiThemeProvider>
			);
	}

}


function mapStateToProps(state) {
	return {
		users: state.users.users
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({postUser: postUser}, dispatch);
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

