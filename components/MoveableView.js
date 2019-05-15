//MoveableView.js

/*
* Usage:
* import MoveableView from './someFolder/MoveableView.js';
* <MoveableView /> 
*/


/*
					<View style={
						{top:this.state.movedPos},
						this.state.activeView ? styles.active : styles.hidden 
					}>
						<View>
							<Text style={styles.welcome}>
								{this.state.movedPos}
							</Text>
							<Text style={styles.welcome}>
								{this.state.diffTemp}
							</Text> 
							
						</View>
					</View>
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
  Easing,
  Button,
  TouchableHighlight 
} from 'react-native';

class MoveableView extends Component {

	constructor(props) {
		super(props);

		let {height, width} = Dimensions.get('window');

		let isActive = false;
		if(this.props.activeId == this.props.id){
			isActive = true; 
		}

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
			active:isActive, // means active "page"
			elPosY:0,
			elHeight:0,
			elHeightRemover:0,

			myStartPosPageY:0,			
			
			myPosPageY:0,
			myPosLocationY:0,

			movedHeight:0,

			touchMoveTotal:0,

			touched:false,
			movedPos:0, // starting from top
			activeView:true,
			windowHeight:height,
			windowWidth:width,

			movableElementBgColorDefault:"orange",
			movableElementBgColor:"orange",

			toBeActiveBgColorDefault:"red",
			toBeActiveBgColor:"red",

			toBeActive:false,

			movedHeightTBA: 0,
			elHeightTBA:0,
		};
	}

	changeActive = (toBeActiveId,direction,total,activeId) => {
		let data = {
			direction:direction,
			toBeActiveId:toBeActiveId,
			thisId:this.props.id,
			totalMove:total,
			activeId:activeId
		}
		this.props.parentReference(data);
		//console.log('should say ', data);
	}

	handleMoveShouldSetResponderCapture(evt){
		return true;
	}

	handleResponderGrant = (evt) =>{ 
	    //console.log("##########",'touch start', evt.nativeEvent.pageY);
	    this.setState({
			touched:true,
			myStartPosPageY: Math.floor(evt.nativeEvent.pageY),
			elHeightRemover: (80 + this.state.elPosY + evt.nativeEvent.locationY), //80 navbar height
		});	
	}

	onLayout = (evt) =>{
	    //console.log('e', evt.nativeEvent.layout); 
		const {x, y, height, width} = evt.nativeEvent.layout;

		this.setState({ 
			elHeight: height,
			elPosY:y,
			movedHeight:height,
		});	
	}

	handleResponderRelease = (evt) =>{
		//console.log('touch end');
		this.setState({
			movableElementBgColor:this.state.movableElementBgColorDefault
		}); 

	}
	move = (evt) => {
		//console.log(evt.nativeEvent);
		let total = this.state.myStartPosPageY - evt.nativeEvent.pageY;

		let mH = this.state.elHeight - total;

		this.setState({
			//movedPos:newPos,
			movedPos:evt.nativeEvent.pageY,
			myPosPageY: Math.floor(evt.nativeEvent.pageY),
			myPosLocationY: Math.floor(evt.nativeEvent.locationY),
			touchMoveTotalY: total,
			movedHeight: mH,
			movableElementBgColor:"brown",
		}); 
		//console.log('Touch ok'); 
		
		//console.log('currentPos', this.state.movedPos);
		//console.log('currentInnerPos', this.state.myPosLocationY);

		this.setState({
			move:{
				posx:evt.nativeEvent.pageX,
				posy:evt.nativeEvent.pageY
			}
		}); 

		let previousIdToSend = this.props.id-1;
		let currentIdToSend = this.props.id;
		let nextIdToSend = this.props.id+1;

		let directiony;
		if( this.state.move.posy < evt.nativeEvent.pageY ){
			if(total > 10){
				console.log('change to next ', this.props.toBeActiveId);
				currentIdToSend = this.props.id-1;
			}
			directiony = "up";
			this.changeActive(this.props.id - 1, directiony, total,currentIdToSend);
		}else{
			if(total > 10){
				console.log('change to next ', this.props.toBeActiveId);
				currentIdToSend = this.props.id+1;
			}
			directiony = "down";
			this.changeActive(this.props.id + 1, directiony, total,currentIdToSend);
		}
		//console.log('directiony', directiony);
	}

	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps ",nextProps);
		if(this.props.id == this.props.activeId){
			console.log('match!'); 
		}

		if(nextProps.toBeActiveId == this.props.id) {
			//if this element is to be active element change its height
			//console.log('to be active',this.props.toBeActiveId);
			//console.log('current active',this.props.id);
			//console.log('el height',this.state.elHeight);

			let heightTBA = this.state.elHeight + this.props.totalMove;
			//console.log('heightTBA', heightTBA);

			if( isNaN(heightTBA) ){
				heightTBA = this.state.elHeight;
			} 

			this.setState({
				toBeActiveBgColor:"purple",
				toBeActive:true,
				movedHeightTBA:heightTBA,
				elHeightTBA:this.state.elHeight,
			});
		}else{
			this.setState({
				toBeActiveBgColor:this.state.toBeActiveBgColorDefault,
				toBeActive:false,
			});
		}
	}

	render() {
		let settings = {
			height:this.state.movedHeight,
			y:this.state.movedPos - this.state.elHeightRemover
		};

		return (
			<View 
			onLayout={(evt) => this.onLayout(evt)}
			style={this.state.active ? [styles.active, {
				backgroundColor: "green",
			}] : styles.hidden}>
				<View
				onResponderGrant={this.handleResponderGrant} 
				onResponderRelease={this.handleResponderRelease}
				onStartShouldSetResponderCapture={this.handleStartShouldSetResponderCapture}
				onMoveShouldSetResponderCapture={this.handleMoveShouldSetResponderCapture} 
				onResponderMove={(evt) => this.move(evt)}
				style={this.state.active ? [{
				backgroundColor: this.state.movableElementBgColor,
				translateY:settings.y,
				height: settings.height,
				}] : [{
					backgroundColor: "purple",
					height: this.state.movedHeightTBA,
					translateY:-this.state.movedHeightTBA + this.state.elHeightTBA,
				}]}
				>
					
			    		<Text
			    			style={{
			    				backgroundColor: this.state.toBeActiveBgColor,
			    				color:"#FFF",
			    				textAlign:"center",
			    				padding:10,
			    			}}
				    	>Change current {this.props.id} # {this.state.toBeActive.toString()}</Text>       
			    	
				</View>
			</View>
		); 
	}
}

/*
const styles2 = StyleSheet.create({
	active:{ 
		flex: 8, 
	    flexDirection: 'row',
		width:"100%",
		backgroundColor: '#00F',
		alignItems:'center', // vertical
		justifyContent:'center', // horizontal
		position:"absolute",
		top:this.state.movedPos - ( (this.state.moveablePlus.size + (this.state.moveablePlus.size/2) ) + (this.state.moveablePlus.margin*2) ), 			
	},
});
*/

const styles = StyleSheet.create({
	mvHolder:{
		backgroundColor:"green",
	},
	hidden:{
		flex: 1,
	},
	active:{ 
		flex:8, 
		width:"100%",
		alignItems:'center', // vertical
		justifyContent:'center', // horizontal
	},
	hiddenLvl3:{
		width:"40%",
		backgroundColor: '#00B1E1',
	},
	hiddenLvl2:{
		width:"60%",
		backgroundColor: '#00B1C2',
	},
	hiddenLvl1:{
		width:"80%",
		backgroundColor: '#00B1B3',
	},
});

export default MoveableView;