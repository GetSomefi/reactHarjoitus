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
	Dimensions} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import BgComponent from './components/BgComponent.js'

var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
};

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
		//this.handleTextChange = this.handleTextChange.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.onSubmit = this.onSubmit.bind(this);		
	}

	handleTextChange = (writtenText) => {
	//handleTextChange(writtenText){ //dakdsakladsljksda
		console.log('state', writtenText);
		this.setState({
			value:writtenText
		});
	} 

	handleFocus(){

	}
	handleBlur(){

	}

	onSubmit(){
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

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#c5ff9063',
	},
	textOverBg: {
		backgroundColor: '#ff90a463',
		justifyContent: 'center',
		alignItems: 'center',
    	height: height,
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
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
  },
  {
    initialRouteName: 'Splash',
  }
); 

const AppContainer = createAppContainer(RootStack);

export default class App extends Component<Props> {
  render() {
    return <AppContainer />;
  }
}
