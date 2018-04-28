import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet } from 'react-native';

import Color from '../Color';
import hexToRgb from 'hex-to-rgb';
// import QuicksandRegular from '../assets/fonts/Quicksand/Quicksand-Regular.ttf';

export default class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hexValue: this.props.hexValue,
      lightOrDark: ''
    }
    this.lightOrDark = this.lightOrDark.bind(this);
  }

  componentDidMount(){
    this.lightOrDark();
  }

  // Make a function that determines whether a hex value is light or dark
  // https://github.com/scottcorgan/contrast
  lightOrDark(hexValue) {
    var rgb = hexToRgb(this.state.hexValue);
    var contrast = Math.round(((Number(rgb[0]) * 299) + (Number(rgb[1]) * 587) + (Number(rgb[2]) * 114)) /1000)
    if (contrast <= 180) {
      this.setState({
        lightOrDark: 'dark'
      })
    } else {
      this.setState({
        lightOrDark: 'light'
      })
    }
  }

  render() {
    // Make a function that sets the background color as the swatch's hex value
    const colorBackground = StyleSheet.flatten([
      styles.swatch,
      { backgroundColor: `#${this.state.hexValue}` }
    ])

    return (
      <View style={colorBackground}>
        <Text style={this.state.lightOrDark === 'dark' ? styles.hexValueDark : styles.hexValueLight}>
          #{this.state.hexValue}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  swatch: {
    backgroundColor: 'white',
    height: 125,
    padding: 50,
    paddingRight: 25
  },
  hexValueLight: {
    fontSize: 20,
    // fontFamily: QuicksandRegular,
    fontWeight: 'bold',
    textAlign: 'right',
    opacity: 0.85,
    color: '#000000'
  },
  hexValueDark: {
    fontSize: 20,
    // fontFamily: QuicksandRegular,
    fontWeight: 'bold',
    textAlign: 'right',
    opacity: 0.85,
    color: '#ffffff'
  }
})
