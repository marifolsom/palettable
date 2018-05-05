import React, { Component } from 'react';
import { Text, View, Button, TouchableHighlight, StyleSheet } from 'react-native';
import Color from '../Color';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: [],
      favorited: false
    }
    this.fetchRandomPalette = this.fetchRandomPalette.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
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
        // If the palette length is not 5, fetch again
        // Probably a better way to do this?
        if (paletteInfo[0].colors.length !== 5) {
          console.log('Palette is too long/short, fetch again');
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

  addFavorite() {
    console.log(`You favorited a palette with the colors ${this.state.palette}!`);
  }

  deleteFavorite() {
    console.log(`You unfavorited a palette with the colors ${this.state.palette}!`);
  }

  render() {
    let colors = {};
    // If the palette is coming from the 'Generate' screen, map over hexValueArray and create a color component with each hex value passed as a prop
    if (this.props.hexValueArray !== undefined) {
      colors = this.props.hexValueArray.map(color => {
        return <Color key={color} hexValue={color} />;
      })
    } else {
      // If the palette is coming from the 'Discover' screen, map over array of rgb values, convert to hex, and create a color component with each hex value passed as a prop
      colors = this.state.palette.map((color, index) => {
        // console.log(color, index);
        return <Color key={color} hexValue={color} />;
      })
    }

    return (
      <View>
        <View style={styles.buttons}>
          <Button title="♥️" onPress={this.addFavorite} />
          <Button title="🗑" onPress={this.deleteFavorite} />
        </View>
        {/* If the palette is coming from the 'Generate' screen, render the colors without a TouchableHighlight */}
        {this.props.hexValueArray !== undefined ? (
          <View>
            {colors}
          </View>
        ) : (
          // Otherwise render the TouchableHighlight that will fetch a random color palette on press
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

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

export default Palette;
