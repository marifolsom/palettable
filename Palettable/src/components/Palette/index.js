import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Color from '../Color';

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: []
    }
  }

  componentDidMount() {
    this.fetchRandomPalette()
  }

  fetchRandomPalette() {
    fetch(`http://www.colourlovers.com/api/palettes/random?format=json`)
      .then(apiResponse => apiResponse.json())
      .then(paletteInfo => {
        console.log(paletteInfo[0].colors);
        this.setState({
          palette: paletteInfo[0].colors
        })
      })
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      })
  }

  render() {
    const colors = this.state.palette.map(color => {
      return <Color key={color} hexValue={color} />
    })

    return (
      <View>
        {colors}
      </View>
    )
  }
}
