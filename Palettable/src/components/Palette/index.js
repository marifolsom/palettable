import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

import Color from '../Color';
import rgbToHex from 'rgb-hex';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: []
    }
    this.fetchRandomPalette = this.fetchRandomPalette.bind(this);
  }

  componentDidMount() {
    this.fetchRandomPalette();
  }

  // Make an API fetch to get the rgb values of a random palette and update the palette state with that info
  fetchRandomPalette() {
    const url = 'http://colormind.io/api/';
    const data = { model: 'default' };
    const http = new XMLHttpRequest();
    const self = this;

    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        const palette = JSON.parse(http.responseText).result;
        console.log(palette);
        self.setState({
          palette: palette
        })
      }
    }

    http.open('POST', url, true);
    http.send(JSON.stringify(data));
  }

  render() {
    // Loop over array of rgb values, convert to hex, and create a color component with its hex value passed as a prop
    const colors = this.state.palette.map(color => {
      const hexValue = rgbToHex(Number(color[0]), Number(color[1]), Number(color[3]));
      console.log(hexValue);
      return <Color key={hexValue} hexValue={hexValue} />
    })

    return (
      <View onPress={this.fetchRandomPalette}>
        <TouchableHighlight onPress={this.fetchRandomPalette}>
          <View>
            {colors}
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

export default Palette;
