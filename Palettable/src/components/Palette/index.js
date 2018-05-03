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

  // Make an API fetch to get the hex values of a random palette and update the palette state with that info
  // // COLORlovers API
  fetchRandomPalette() {
    fetch(`http://www.colourlovers.com/api/palettes/random?format=json`)
      .then(apiResponse => apiResponse.json())
      .then(paletteInfo => {
        console.log(paletteInfo[0].colors);
        console.log(paletteInfo[0].colors.length);
        // If the palette length is not 5, fetch again
        // Probably a better way to do this?
        if (paletteInfo[0].colors.length !== 5) {
          console.log('Palette is too long/short');
          fetch(`http://www.colourlovers.com/api/palettes/random?format=json`)
            .then(apiResponse => apiResponse.json())
            .then(paletteInfo => {
              this.setState({
                palette: paletteInfo[0].colors
              })
            })
        } else {
          this.setState({
            palette: paletteInfo[0].colors
          })
        }
      })
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      })
  }

  // // Make an API fetch to get the rgb values of a random palette and update the palette state with that info
  // // Colormind API
  // fetchRandomPalette() {
  //   const url = 'http://colormind.io/api/';
  //   const data = { model: 'default' };
  //   const http = new XMLHttpRequest();
  //   const self = this;
  //
  //   http.onreadystatechange = function() {
  //     if(http.readyState == 4 && http.status == 200) {
  //       const palette = JSON.parse(http.responseText).result;
  //       // console.log(palette);
  //       self.setState({
  //         palette: palette
  //       })
  //     }
  //   }
  //
  //   http.open('POST', url, true);
  //   http.send(JSON.stringify(data));
  // }

  render() {
    let colors = {};
    if (this.props.hexValueArray !== undefined) {
      // Loop over hexValueArray, and create a color component with each hex value passed as a prop
      colors = this.props.hexValueArray.map(color => {
        // console.log(color);
        return <Color key={color} hexValue={color} />;
      })
    } else {
      // Loop over array of rgb values, convert to hex, and create a color component with each hex value passed as a prop
      // // COLORlovers API
      colors = this.state.palette.map(color => {
        return <Color key={color} hexValue={color} />;
      })
      // // Colormind API
      // colors = this.state.palette.map(color => {
      //   const hexValue = rgbToHex(Number(color[0]), Number(color[1]), Number(color[3]));
      //   // console.log(hexValue);
      //   return <Color key={hexValue} hexValue={hexValue} />
      // })
    }

    return (
      <View>
        {this.props.hexValueArray !== undefined ? (
          <View>
            {colors}
          </View>
        ) : (
          <TouchableHighlight onPress={this.fetchRandomPalette}>
            <View>
              {colors}
            </View>
          </TouchableHighlight>
        )}
      </View>
    )
  }
}

export default Palette;
