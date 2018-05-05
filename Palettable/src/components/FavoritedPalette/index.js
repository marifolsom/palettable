import React, { Component } from 'react';
import { Text, View, Button, TouchableHighlight, StyleSheet, AlertIOS } from 'react-native';
import Color from '../Color';
import firebase from 'firebase';

class FavoritedPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: this.props.palette,
      favorited: false
    }
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  async deleteFavorite() {
    // Get the current user
    console.log(await firebase.auth().currentUser);
    const currentUser = await firebase.auth().currentUser;
    // Get a unique key
    const databaseRef = await firebase.database().ref(currentUser.uid).child('favorites').push();

  }

  render() {
    const colors = this.state.palette.map(color => {
      return <Color key={color} hexValue={color} />;
    })

    return (
      <View>
        <View style={styles.buttons}>
          <Button title="♥️" onPress={this.addFavorite} />
          <Button title="🗑" onPress={this.deleteFavorite} />
        </View>
        <View>
          {/* {colors} */}
        </View>
      </View>
    )
  }
}

export default FavoritedPalette;
