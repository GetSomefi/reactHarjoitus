/**
 * harjoittelu app
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';

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

type Props = {};
export default class App extends Component<Props> {
  render() {
  	let bgImage = require('./assets/vuoristomaisema.jpg');
  	let bgType = "asBackground2";
    return (
		<ScrollView>
			<BgComponent imgSrc={bgImage} bgType={bgType} style={styles.bgImageCover} />
			<View style={styles.container}>
				<View style={styles.textOverBg}>
					<Text style={styles.welcome}>Jee!</Text>
					<Text style={styles.instructions}>To get started, edit App.js</Text>
					<Text style={styles.instructions}>To get started, edit App.js</Text>
					<Text style={styles.instructions}>To get started, edit App.js</Text>
					<Text style={styles.instructions}>{instructions}</Text>
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
