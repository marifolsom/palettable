import React, { Component } from 'react';
import { Text, View, Button, TouchableHighlight, StyleSheet, AlertIOS } from 'react-native';
import FavoritedColor from '../FavoritedColor';
import * as firebase from 'firebase';

class FavoritedPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: this.props.palette
    }
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  async deleteFavorite() {
    console.log('You unfavorited a palette with containing these colors:', this.state.palette);
    // Get the current user
    console.log(await firebase.auth().currentUser);
    const currentUser = await firebase.auth().currentUser;
    // Get a unique key
    const databaseRef = await firebase.database().ref(currentUser.uid).child('favorites').push();

  }

  render() {
    const colors = this.state.palette.map((color, index) => {
      // console.log('a color:', color);
      return <FavoritedColor key={index} hexValue={color} />;
    })

    return (
      <View>
        <View style={styles.buttons}>
          <Button title="🗑" onPress={this.deleteFavorite} />
        </View>
        <View>
          {colors}
        </View>
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

export default FavoritedPalette;
