import React, { Component } from 'react';
import { AlertIOS, Button, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';
import FavoritedColor from '../FavoritedColor';

class FavoritedPalette extends Component {
  // Make a function that removes a palette from the current user's favorites
  // Right now this deletes the most recently favorited palette...
  async deleteFavorite() {
    AlertIOS.alert('Palette removed from favorites');
    // Get the current user
    const currentUser = await firebase.auth().currentUser;
    // Get the palette's unique id and remove from database
    firebase.database().ref(currentUser.uid).child('favorites').child(this.props.id).remove();
  }

  render() {
    // Map over each color in the palette and create a FavoritedColor component with its hexValue passed as a prop
    const colors = this.props.palette.map((color, index) => {
      return <FavoritedColor key={index} hexValue={color} />;
    })

    return (
      <View>
        <View style={styles.buttons}>
          <Button title="🗑" onPress={this.deleteFavorite.bind(this)} />
        </View>
        <View style={styles.container}>
          {colors}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 103.8,
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
