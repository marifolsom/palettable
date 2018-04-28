import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet } from 'react-native';

import Color from '../Color';

export default class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hex: this.props.hex
    }
  }


  render() {

    const colorBackground = StyleSheet.flatten([
      styles.color,
      {
        backgroundColor: `#${this.state.hex}`
      }
    ])

    return (
      <View style={colorBackground}>
        <Text style={styles.colorNumber}>#{this.state.hex}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  color: {
    backgroundColor: 'white',
    height: 125
  },
  colorNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right'
  }
})
