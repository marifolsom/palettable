import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

import Color from '../Color';

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: {}
    }
  }

  componentDidMount() {
    this.fetchPaletteColors()
  }

  fetchPaletteColors() {
    fetch(`http://www.colourlovers.com/api/patterns/random`)
      .then(apiResponse => apiResponse.json())
      .then(paletteInfo => {
        console.log(paletteInfo.pattern.colors);
        // this.setState({
        //   palette: paletteInfo.pattern.colors
        // })
      })
  }

  render() {
    return (
      <View>
        <Color />
      </View>
    )
  }
}
