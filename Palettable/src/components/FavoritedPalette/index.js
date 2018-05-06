import React, { Component } from 'react';
import { Text, View, Button, TouchableHighlight, StyleSheet, AlertIOS } from 'react-native';
import FavoritedColor from '../FavoritedColor';
import * as firebase from 'firebase';

class FavoritedPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: this.props.palette,
      id: this.props.id
    }
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  async deleteFavorite() {
    AlertIOS.alert('Palette removed from favorites');
    // Get the current user
    const currentUser = await firebase.auth().currentUser;
    // Get the palette's unique id and remove from database
    firebase.database().ref(currentUser.uid).child('favorites').child(this.state.id).remove();
  }

  render() {
    const colors = this.state.palette.map((color, index) => {
      return <FavoritedColor key={index} hexValue={color} />;
    })

    return (
      <View>
        <View style={styles.buttons}>
          <Button title="🗑" onPress={this.deleteFavorite} />
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
