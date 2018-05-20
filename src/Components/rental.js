import React, { Component } from "react";
import { Link } from "react-router-dom";
import data from "./Outstation.json";
import Reveal from "./Reveal.js";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUser} from "./../action/dataUserActions.js";

 class Rental extends Component{
	constructor(args) {
		super(args);
		this.state = {
			src:"",
			errorSrc:false,
			des:"",
			errorDes:false,

			showGetTime: false,
			proceedForSelection: false,
		    dataFile: data,
			getRideTime:"",
			errorGettime:false,
			revealClass: "w3-hide",
			getUserName: "",
		
			carNameSelected: "",
			carTypeSelected: "",
			carDriverSelected: "",
			carNumber: "",
			ridePrice: ""
		};
	}

	componentDidMount(){
		this.props.getUser();
	}

	componentWillReceiveProps(newProps){
		
		newProps.users.map((data)=>{
			this.setState({
				getUserName: data.name
		
			});
		});
		console.log("newProps state----", this.state.getUserName);
	}
	    src(e)
	    {
	 	let source= e.target.value;
		if(source.length > 0 ){
			this.setState({
				src:source
			});
		}
		}


		
    changeOne(value){
    	console.log("~~~~~", value);
    	if(value === "later"){
    		this.setState({
    			showGetTime: true
    		});
    	}else if(value === "now")
    	this.setState({
    		showGetTime: false,
    			proceedForSelection: true
    	});
    }
    handleLanguageSelect(value) {
    	
    }
    proceedButton(e) {
    	e.preventDefault()
    	if(this.state.src  || this.state.getRideTime) {
    		this.setState({
    			revealClass: "w3-show"
    		}, () => {
			this.setState({
				errorSrc: false,
				
				errorGettime:false
				
			});

		});
    }
    else if(this.state.src  || this.state.getRideTime){
    	
			this.setState({
				errorSrc: false,
			
				errorGettime: false
			})
    }
    if(!this.state.src){
			this.setState({
				errorSrc: true
			})
		} 
		
		if(!this.state.getRideTime) {
			this.setState({
				errorGettime: true
			})
		} 
	}

    getTime(e) {
    	let valueTime = e.target.value;
    	if(valueTime.length > 0){
    		this.setState({
    			getRideTime: valueTime
    		})
    	}
    }

    cardSelected(dataValue){
    	console.log("dataValue", dataValue);

    	this.setState({
    		//carTypeSelected: dataValue.car_type,
    		carNameSelected: dataValue.car_model,
    		//carDriverSelected: dataValue.driver_nAme,
    		carNumber: dataValue.car_no,
    		ridePrice: dataValue.price
    	});
	}

	closeModal(){
		this.setState({
			revealClass: "w3-hide"
		});
	}

render(){
	var display = [];
	if(this.state.dataFile.length > 0) {
		display = this.state.dataFile.map((data, idx) => {
			console.log("~~~~", data);
			return (
					<div >
					<div className="w3-row" key={"index" + idx} style={{border: "1px solid #000", cursor: "pointer", padding: "5px", margin: "5px"}} onClick={this.cardSelected.bind(this, data)}>
						<label className="w3-col s4 m4 l4">{data.car_type}</label>
						<label className="w3-col s4 m4 l4">{data.price}</label>
						<img className="w3-col s4 m4 l4" src={data.path} style={{width: "30px", height: "30px"}} />
					</div>
					</div>
				);
		});
	}
		return(
			<div className="w3-container">
			    <div className="w3-row">
			    	<div className="w3-col s5 m5 l5">
			    	<form style={{paddingTop:"60px"}}>
			    	    <div className="w3-row formpos">
			    	         <Link to="Srcdes">
			    			<button className="w3-button w3-blue w3-hovor-green btnstyle w3-col s4 m4 l4"> city </button>
			    			</Link>
			    			<Link to="Outstation">
			    			<button className="w3-button w3-blue w3-hovor-green btnstyle w3-col s4 m4 l4"> Outstation </button>
			    			</Link>
			    			
			    			<button className="w3-button w3-yellow w3-hovor-green btnstyle w3-col s4 m4 l4"> Rental </button>
			    			
			    		</div>

			    		<div className="w3-row formpos namepos">
			    			<label> Pickup From </label>
			    			&nbsp;&nbsp;&nbsp;
			    			<input className="textbox namepos " type ="text" onChange={this.src.bind(this)}placeholder="Source" />
			    			{(this.state.errorSrc) ? 
	        		        <label className="warning">Name must not be empty!</label>
	        		        :null
	        				}
			    		
			    		</div>
                          <div className="w3-row">
						  <input className="formpos" type="radio" name="gender" value="now"   onChange={this.changeOne.bind(this, "now")} /> Now
						  <input className="formpos" type="radio" name="gender" value="later"  onChange={this.changeOne.bind(this, "later")} /> Later
						</div> 

						<div className="w3-row">
						{(this.state.showGetTime) ? 
							<div>
				            <input className="namepos formpos textbox" type="text" placeholder="Enter time here" onChange={this.getTime.bind(this)} />
							{display}
							{(this.state.errorGettime) ?
							<label className="Warning"> Enter Time</label> 
							: null
							 }
							 </div> :
							 <div>
							 {(this.state.proceedForSelection) ?
							 	<div>
							 	{display}
							 	</div> :
							 	null
							 }
							 </div>
							}
						</div>
			    		<div className="w3-row formpos">
			    			<button className="w3-button w3-yellow w3-hovor-green" onClick={this.proceedButton.bind(this)}> Proceed </button>
			    		</div>
			    	
			    		
			    		

			    	</form>
			    	 <Reveal openCls={this.state.revealClass} customWidth="800px" style={{padding: "30px"}}>
			    	 	<div className="w3-row" style={{padding: "20px"}}>
			    	 	<span className="fa fa-close w3-right" style={{fontSize: "22px", cursor: "pointer"}} onClick={this.closeModal.bind(this)}></span>
			    	 	<label className="w3-row" style={{padding: "10px"}}>Name : {this.state.getUserName}</label>
			    	 	<label className="w3-row" style={{padding: "10px"}}>Source : {this.state.src}</label>
			    	 	
			    	 	<div className="w3-row">
			    	 	<label className="w3-row" style={{padding: "10px"}}>Car Name : {this.state.carNameSelected}</label>
			    	 	<label className="w3-row" style={{padding: "10px"}}>Car Time : {this.state.getRideTime}</label>
			    	 	
			    	 	<label className="w3-row" style={{padding: "10px"}}>Car Number : {this.state.carNumber}</label>
			    	 	<label className="w3-row" style={{padding: "10px"}}>Price : {this.state.ridePrice}</label>
			    	 	<div className="w3-row w3-panel w3-center" style={{padding: "10px", color: "green", backgroundColor: "#000"}}>YOUR RIDE IS ARRIVING</div>
			    	 	</div>
			    	 	</div>
			    	 </Reveal>

			    	</div>
			    	<div className="w3-col s7 m7 l7 backgroundimg" style={{minHeight: "100vh"}}>
			    	</div>
			    </div>
			</div>
			);
	}
}
function mapStateToProps(state) {
	return {
		users: state.users.users
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({getUser: getUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rental);