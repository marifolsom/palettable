import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import hexToRgb from 'hex-to-rgb';
import { Fonts } from '../../utils/Fonts';

class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hexValue: this.props.hexValue,
      lightOrDark: ''
    }
    this.lightOrDark = this.lightOrDark.bind(this);
  }

  componentDidMount(){
    this.lightOrDark(this.state.hexValue);
  }

  // Make a function that determines whether a hex value is light or dark
  // https://github.com/scottcorgan/contrast/blob/master/index.js
  lightOrDark(hexValue) {
    var rgb = hexToRgb(hexValue);
    var contrast = Math.round(((Number(rgb[0]) * 299) + (Number(rgb[1]) * 587) + (Number(rgb[2]) * 114)) / 1000);
    contrast <= 180 ? this.setState({ lightOrDark: 'dark' }) : this.setState({ lightOrDark: 'light' });
  }

  render() {
    // Make a function that sets the background color as the swatch's hex value
    const colorBackground = StyleSheet.flatten([
      styles.swatch,
      { backgroundColor: `#${this.state.hexValue}` }
    ])

    console.log(this.state.lightOrDark);

    return (
      <View style={colorBackground}>
        <Text style={[styles.hexValue, this.state.lightOrDark === 'dark' ? styles.hexValueDark : styles.hexValueLight]}>
          #{this.state.hexValue.toUpperCase()}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  swatch: {
    height: 111,
    paddingLeft: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  hexValue: {
    fontSize: 25,
    fontFamily: Fonts.QuicksandMedium,
    textAlign: 'left',
    opacity: 0.85,
  },
  hexValueLight: {
    color: '#000000'
  },
  hexValueDark: {
    color: '#ffffff'
  }
})

export default Color;
