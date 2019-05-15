//MoveableButton.js

/*
* Usage:
* import MoveableButton from './someFolder/MoveableButton.js';
* <MoveableButton /> 
*/

import React, { Component } from 'react';

import {
  View,
  Image,
  ImageBackground,
  Text, 
  StyleSheet,
  Dimensions,
  Animated,
  Easing
} from 'react-native';

class MoveableButton extends Component {

	constructor(props) {
		super(props);

        let {height, width} = Dimensions.get('window');

		this.state = {
			move:{
				posx:0,
				posy:0,
				directiony:"",
				directionx:"",
				difference:0
			},
			moveablePlus:{
				size:40,
				margin:15,	
			},
			
			myStartPosPageY:0,			
			
			myPosPageY:0,
			myPosLocationY:0,

			touchMoveTotal:0,

			touched:false,
			movedPos:height - 80, // starting from bottom
			activeView:true,
			windowHeight:height,
			windowWidth:width,
		}; 
	}

	//this.state.moveablePlus["size"]

	//the responder system bubbles up from the deepest component, 
	//a parent View wants to prevent the child from becoming responder on a touch move
	//so this sets touch on
	handleMoveShouldSetResponderCapture(evt){
		return true;
	}

	handleResponderGrant = (evt) =>{ 
	    console.log("##########",'touch start', evt.nativeEvent.pageY);
	    this.setState({
			touched:true,
			myStartPosPageY: Math.floor(evt.nativeEvent.pageY),
		});
	}
	handleResponderRelease = (evt) =>{
		console.log('touch end');

		//pageY - The Y position of the touch, relative to the root element
		//locationY - The Y position of the touch, relative to the element
		/*
		this.setState({
			touched:false,
			myPosPageY: Math.floor(evt.nativeEvent.pageY),
			myPosLocationY: Math.floor(evt.nativeEvent.locationY),	
		});
		*/

		if(this.state.diffTemp > 200){
			this.setState({
				activeView:false    		 
			}); 
		}else{
			this.setState({
				activeView:true
			}); 
		}
	}


	//https://facebook.github.io/react-native/docs/gesture-responder-system.html
	//evt is a synthetic touch event with the following form:
	move = (evt) => { 
		//console.log('moving', 'X='+evt.nativeEvent.pageX, 'Y='+evt.nativeEvent.pageY);
		//console.log(evt);
		console.log(evt.nativeEvent);

		

		//add this value to element that need movement
		/*
		let posDiff = this.state.move.posy - evt.nativeEvent.pageY; 
		console.log('posDiff', posDiff);

		if( this.state.touched ){
			console.log(':) --------------- touch'); 
		}else{
			console.log(':( --------------- no touch'); 
		}
		*/
 	
		//if( this.state.touch ){
			//let newPos = this.state.movedPos - posDiff;
			//let newPos = this.state.movedPos - posDiff;
			//let newPos = evt.nativeEvent.pageY;
			//newPos = this.state.windowHeight - newPos;

			let total = this.state.myStartPosPageY - evt.nativeEvent.pageY;
			this.setState({
				//movedPos:newPos,
				movedPos:evt.nativeEvent.pageY,
				myPosPageY: Math.floor(evt.nativeEvent.pageY),
				myPosLocationY: Math.floor(evt.nativeEvent.locationY),
				touchMoveTotalY: Math.floor(total),
			}); 
			console.log('Touch ok'); 
		//}
		console.log('currentPos', this.state.movedPos);

		let directiony = "down";
		if( this.state.move.posy < evt.nativeEvent.pageY ){
			directiony = "up"; 
		}
		console.log('directiony', directiony);

		this.setState({
			move:{
				posx:evt.nativeEvent.pageX,
				posy:evt.nativeEvent.pageY
			}
		}); 
	} 

  render() {

	return (
	<View 
		onResponderGrant={this.handleResponderGrant} 
		onResponderRelease={this.handleResponderRelease}
		onStartShouldSetResponderCapture={this.handleStartShouldSetResponderCapture}
		onMoveShouldSetResponderCapture={this.handleMoveShouldSetResponderCapture} 
		onResponderMove={(evt) => this.move(evt)} 
		style={{
			position:"absolute", 
			right:0, 
			top:this.state.movedPos - ( (this.state.moveablePlus.size + (this.state.moveablePlus.size/2) ) + (this.state.moveablePlus.margin*2) ), 
			backgroundColor:"#000",
			width: this.state.moveablePlus.size,
		    height: this.state.moveablePlus.size,
		    borderRadius: this.state.moveablePlus.size/2,
		    margin:this.state.moveablePlus.margin
		}}>
		<Text style={{color:"#FFF",textAlign:"center", lineHeight:40}}>
			+
		</Text>	
		<View style={{width:80, backgroundColor:"#000",position:"absolute",left:-100}}>
			<Text style={{color:"#FFF", padding:4, fontSize:10}}>
				Start Y: {this.state.myStartPosPageY}
			</Text>
			<Text style={{color:"#FFF", padding:4, fontSize:10}}> 
				Current Y: {this.state.myPosPageY}
			</Text>
			<Text style={{color:"#FFF", padding:4, fontSize:10}}>
				Diff: {this.state.touchMoveTotalY}
			</Text>
		</View>
	</View>
	); 
    


  }
}

const styles = StyleSheet.create({
});

export default MoveableButton;