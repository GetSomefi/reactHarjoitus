import React, { Component } from 'react';

import {
  View,
  Image,
  ImageBackground,
  Text, 
  StyleSheet
} from 'react-native';

class BgComponent extends Component {

  constructor(props) {
    super(props);
    let p = this.props;
       
  }
  render() {
    console.log("dsa2", this.props.imgSrc);
    console.log(this.props);
    console.dir(this.props);

    if(this.props.bgType == "asBackground"){
      return (
        <ImageBackground resizeMode='cover' source={this.props.imgSrc} style={styles.asBgImg}>
          <Text>As Background</Text>
        </ImageBackground>
      ); 
    }else{
      return (
        <View style={styles.asImg}> 
          <Text>As Image</Text>
          <Text>As Image</Text>
          <Text>As Image</Text>
          <Text>As Image</Text>
          <Text>As Image</Text> 
          <Image source={this.props.imgSrc} style={styles.img} />
        </View>
      ); 
    }


  }
}

const styles = StyleSheet.create({
  asBgImg:{
    width: "100%", 
    height: "100%",
    flex:1, 
  },  
  asImg:{
    position:'absolute',
    width: "100%", 
    height: "100%",  
  },  
  img:{
    position:'absolute',
    width: "100%",
    height: "100%",
  }, 
});

export default BgComponent;