import React, { Component } from 'react';
import { AlertIOS, Button, StyleSheet, TouchableHighlight, View } from 'react-native';
import * as firebase from 'firebase';
import FavoritedColor from '../FavoritedColor';

class FavoritedPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    }
    this.deleteFavorite = this.deleteFavorite.bind(this);
    this.showHex = this.showHex.bind(this);
    this.hideHex = this.hideHex.bind(this);
  }

  // Make a function that removes a palette from the current user's favorites
  async deleteFavorite() {
    AlertIOS.alert('Palette removed from favorites');
    // Get the current user
    const currentUser = await firebase.auth().currentUser;
    // Get the palette's unique id and remove from database
    firebase.database().ref(currentUser.uid).child('favorites').child(this.props.id).remove();
  }

  showHex() {
    this.setState({
      pressed: true
    })
  }

  hideHex() {
    this.setState({
      pressed: false
    })
  }

  render() {
    // Map over each color in the palette and create a FavoritedColor component with its hexValue passed as a prop
    const colors = this.props.palette.map((color, index) => {
      return <FavoritedColor key={index} hexValue={color} pressed={this.state.pressed} />;
    })

    return (
      <View>
        <View style={styles.buttons}>
          <Button title="🗑" onPress={this.deleteFavorite} />
        </View>
        <TouchableHighlight style={styles.container} onPressIn={this.showHex} onPressOut={this.hideHex}>
          <View style={styles.container}>
            {colors}
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: 375,
    display: 'flex',
    flexDirection: 'row',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

export default FavoritedPalette;
