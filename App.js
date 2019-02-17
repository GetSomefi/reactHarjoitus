/**
 * harjoittelu app
 * ---------------
 * For navigation 
 * https://reactnavigation.org/docs/en/getting-started.html
 */

import React, {Component} from 'react';
import {
	Platform, 
	StyleSheet, 
	Text, 
	View, 
	ScrollView, 
	Button,
	TextInput, 
	Dimensions,
	Animated,
	Easing,
	ListView
} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

//if component isn't loading run react-native start --reset-cache
import BgComponent from './components/BgComponent.js';
import MoveableButton from './components/MoveableButton.js';
import MoveableView from './components/MoveableView.js'; 

var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
};

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    translateYValue: new Animated.Value(100),
  }

  componentDidMount() {
    Animated.parallel([
	    Animated.timing(                  // Animate over time
	      this.state.fadeAnim,            // The animated value to drive
	      {
	        toValue: 1,                   // Animate to opacity: 1 (opaque)
	        duration: 1000,              // Make it take a while
	      }
	    ),
	    Animated.timing(                  // Animate over time
	      this.state.translateYValue,            // The animated value to drive
	      {
	        toValue: 0,                   // Animate to opacity: 1 (opaque)
	        duration: 1000,              // Make it take a while
	      }
	    ),
    ]).start();                        
  }

  render() {
    let { fadeAnim,translateYValue } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
          transform: [{ translateY: translateYValue }],
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
//<Text style={styles.instructions}>{instructions}</Text> 

type Props = {};

//export default class App extends Component<Props> {
//changed to this after implementing React Navigation
class Splash extends Component<Props> {
	constructor(){
		super();
		let defaultText = "Write something";
		this.state = {
			value:"",
			placeholder:defaultText,
			currentStateInfo:"",
		};

		/*
		these are obsolete when using fat arrow function
		something = () => {}
		*/
		//this.handleTextChange = this.handleTextChange.bind(this);
		//this.handleFocus = this.handleFocus.bind(this);
		//this.handleBlur = this.handleBlur.bind(this);
		//this.onSubmit = this.onSubmit.bind(this);		
	}

	handleTextChange = (writtenText) => {
	//handleTextChange(writtenText){ //dakdsakladsljksda
		console.log('state', writtenText);
		this.setState({
			value:writtenText
		});
	} 

	handleFocus = () => {

	}
	handleBlur= () => {

	}

	onSubmit = (writtenText) => {
		this.setState({
			currentStateInfo:"Submit pressed, please wait!"
		});
	}


	render() {
		let bgImage = require('./assets/vuoristomaisema.jpg');
		let bgType = "asBackground2";
		return (
			<ScrollView>
				<BgComponent imgSrc={bgImage} bgType={bgType} style={styles.bgImageCover} />
				<View style={styles.container}>
					<View style={styles.textOverBg}>
						<Text style={styles.welcome}>Welcome!</Text>
						<Text style={styles.instructions}>This is just some Example app</Text>
						<Button 
							title="Let's begin"
		      				onPress={() => this.props.navigation.navigate('Home')}
		      			/>
		      			<Button 
							title="Stacked view test"
		      				onPress={() => this.props.navigation.navigate('StackedView')}
		      			/>
		      			<Text>{this.state.currentStateInfo}</Text>
		      			<Text>{this.state.value}</Text>
		      			<TextInput
		      				placeholder={this.state.placeholder}
		      				defaultValue={this.state.value}
		      				onChangeText={this.handleTextChange}
		      				onFocus={this.handleFocus}
		      				onBlur={this.handleBlur}
		      			/>
		      			<Button 
							title="Submit"
		      				onPress={this.onSubmit}  
		      			/> 
					</View> 
					<View style={{flex: 1, backgroundColor: 'steelblue'}} /> 
					<FadeInView style={{flex: 1, flexDirection: 'row',backgroundColor: '#FFF'}}>
  						<Text style={{width:"50%",fontSize: 28, textAlign: 'center'}}>1</Text>
  						<Text style={{width:"50%",fontSize: 28, textAlign: 'center'}}>2</Text>
  					</FadeInView>
				</View>
			</ScrollView> 
		);
	}
}

class Home extends Component<Props> {
  render() {
    return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.textOverBg}>
					<Text style={styles.welcome}>Jee2!</Text>
				</View>
			</View>		
		</ScrollView>
    );
  }
}

class StackedView extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
        	...this.props,
			movePos:0,
			activeView:true,
			activeId:4,
			toBeActiveId:0,
			directionY:"up",
		};
    } 

	testing = () => {
		console.log('active', this.state.activeId); 
	}

	windowLoop = () => {
		let allWindows = [];
		let windowAmount = 5;
		for (var i=0; i < windowAmount; i++) {
			let isActive = "hidden";
			if(i == this.state.activeId-1){
				isActive = "active";
			}

			//console.log('act ', isActive); 
			let ar = {
				key:i,
				mvStatus:isActive
			}
	        allWindows.push(ar);
		}	
		
		return allWindows;
	}

	//https://stackoverflow.com/questions/41638032/how-to-pass-data-between-child-and-parent-in-react-native
	parentMethod = (data) => {
		//parentMethod(data) {
		console.log('active', data);
		this.setState({
			toBeActiveId:data.toBeActiveId,
			directionY:data.direction,
		});
	}

	render() {
	let bgImage = require('./assets/bg1_japan.png');
	let bgType = "asBackground2";
	let windowStack = this.windowLoop();

	//{this.windowLoop} <MoveableView
	return (
		<View style={{flex:1}}>
			<BgComponent imgSrc={bgImage} bgType={bgType} style={styles.bgImageCover} />
			<View style={styles.stackedContainer}>
				<View style={styles.stackedViewsHolder}>	
					{this.windowLoop().map((row) => {
        				return <MoveableView
						key={row.key} //this can't be accessed inside the component
						id={row.key}  //so it needs id that can be accessed
						toBeActiveId={this.state.toBeActiveId}
						directionY={this.state.directionY}
						mvStatus={row.mvStatus}
						onRef={ref => (this.parentReference = ref)}
						parentReference = {this.parentMethod}
						/> 				
    				})}
				</View> 
			</View>

			<MoveableButton /> 


			<Button 
				title="Check current"
		      	onPress={this.testing}
		    />
		</View>
	);
	}
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
	//StackedView
	stackedContainer:{
		flex:1,
		height:height-80,
		backgroundColor: '#F00',
		alignItems:"center",
	},
	stackedViewsHolder:{
		alignItems:"center",
		backgroundColor:"#666",
		width:"80%",
		justifyContent:'space-evenly',
		flex: 1,
        flexDirection: 'column',
        margin:30,
	},
	height1000:{
		height:1000
	},
	//regular
	container: {
		flex: 1,
		height:height-80,
		backgroundColor: '#c5ff9063',
	},
	textOverBg: {
		flex: 6,
		backgroundColor: '#ff90a463', 
		alignItems: 'center',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color:"#FFF"
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	bgImageCover: {
		color: '#333333',
	},
}); 



const RootStack = createStackNavigator(
  {
    Splash: Splash,
    Home: Home,
    StackedView: StackedView,
  },
  {
    //initialRouteName: 'Splash',
    initialRouteName: 'StackedView',
  }
); 

const AppContainer = createAppContainer(RootStack);

export default class App extends Component<Props> {
  render() {
    return <AppContainer />;
  }
}
