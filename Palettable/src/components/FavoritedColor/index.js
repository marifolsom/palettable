import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
      <View style={colorBackground}></View>
    )
  }
}

const styles = StyleSheet.create({
  swatch: {
    height: 103.8,
    width: 75
  }
})

export default Color;
