import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import hexToRgb from 'hex-to-rgb';
import { Fonts } from '../../utils/Fonts';

class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hexValue: this.props.hexValue
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
        <Text style={[styles.hexValue, this.state.lightOrDark === 'dark' ? styles.hexValueDark : styles.hexValueLight]}>
          #{this.state.hexValue.toUpperCase()}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default Color;
