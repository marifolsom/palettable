import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Fonts } from '../../utils/Fonts';
import hexToRgb from 'hex-to-rgb';

class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightOrDark: ''
    }
    this.lightOrDark = this.lightOrDark.bind(this);
  }

  componentDidMount(){
    this.lightOrDark(this.props.hexValue);
  }

  // Make a function that determines whether a hex value is light or dark
  // https://github.com/scottcorgan/contrast/blob/master/index.js
  lightOrDark(hexValue) {
    const rgb = hexToRgb(hexValue);
    const contrast = Math.round(((Number(rgb[0]) * 299) + (Number(rgb[1]) * 587) + (Number(rgb[2]) * 114)) / 1000);
    contrast <= 180 ? this.setState({ lightOrDark: 'dark' }) : this.setState({ lightOrDark: 'light' });
  }

  render() {
    // Make a function that sets the background color as the swatch's hex value
    const colorBackground = StyleSheet.flatten([
      styles.swatch,
      { backgroundColor: `#${this.props.hexValue}` }
    ])

    return (
      <View style={colorBackground}>
        <Text style={[styles.hexValue, this.state.lightOrDark === 'dark' ? styles.hexValueDark : styles.hexValueLight]}>
          #{this.props.hexValue.toUpperCase()}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  swatch: {
    height: 103.8,
    width: 375,
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
