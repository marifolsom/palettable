import React, { Component } from 'react';
import { AlertIOS, Button, StyleSheet, TouchableHighlight, View } from 'react-native';
import * as firebase from 'firebase';
import Color from '../Color';
import arrayHasDuplicates from 'array-has-duplicates';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: []
    }
    this.fetchRandomPalette = this.fetchRandomPalette.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
  }

  componentDidMount() {
    this.fetchRandomPalette();
  }

  // Make an API fetch to get the hex values of a random palette and update the palette state with that info
  fetchRandomPalette() {
    fetch(`http://www.colourlovers.com/api/palettes/random?format=json`)
      .then(apiResponse => apiResponse.json())
      .then(paletteInfo => {
        // If the palette length is not 5, fetch again
        if (paletteInfo[0].colors.length !== 5) {
          console.log('Palette is too long/short, fetching again');
          fetch(`http://www.colourlovers.com/api/palettes/random?format=json`)
            .then(apiResponse => apiResponse.json())
            .then(paletteInfo => {
              this.setState({
                palette: paletteInfo[0].colors
              })
            })
        // If the palette has duplicate hex values, fetch again -- checked using npm package array-has-duplicates
        } else if (arrayHasDuplicates(paletteInfo[0].colors)) {
          console.log('Palette has duplicates, fetching again');
          fetch(`http://www.colourlovers.com/api/palettes/random?format=json`)
            .then(apiResponse => apiResponse.json())
            .then(paletteInfo => {
              this.setState({
                palette: paletteInfo[0].colors
              })
            })
        // Otherwise update the state
        } else {
          this.setState({
            palette: paletteInfo[0].colors
          })
        }
      })
      .catch(error => {
        console.log('Error:', error.message);
      })
  }

  async addFavorite() {
    // If the user is not logged in alert them to log in or register first
    if (!firebase.auth().currentUser) {
      AlertIOS.alert('Log in or create an account to save to favorites');
    }
    // Get the current user
    console.log('current user:', await firebase.auth().currentUser);
    const currentUser = await firebase.auth().currentUser;
    // Get a unique key
    const databaseRef = await firebase.database().ref(currentUser.uid).child('favorites').push();
    // If the palette is coming from the 'Generate' screen, save palette that's stored in props
    if (this.props.hexValueArray !== undefined) {
      AlertIOS.alert('Palette saved to favorites');
      // Update the palette at that unique key
      databaseRef.set({
        palette: this.props.hexValueArray
      })
    // If the palette is coming from the 'Discover' screen, save palette that's stored in state
    } else {
      AlertIOS.alert('Palette saved to favorites');
      // Update the palette at that unique key
      databaseRef.set({
        palette: this.state.palette
      })
    }
  }

  render() {
    let colors = {};
    // If the palette is coming from the 'Generate' screen, map over the palette that's stored in props and create a color component with each hex value passed as a prop
    if (this.props.hexValueArray !== undefined) {
      colors = this.props.hexValueArray.map(color => {
        return <Color key={color} hexValue={color} />;
      })
    // If the palette is coming from the 'Discover' screen, map over the palette that's stored in state, convert to hex, and create a color component with each hex value passed as a prop
    } else {
      colors = this.state.palette.map(color => {
        return <Color key={color} hexValue={color} />;
      })
    }

    return (
      <View>
        <View style={styles.buttons}>
          <Button title="♥️" onPress={this.addFavorite} />
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
