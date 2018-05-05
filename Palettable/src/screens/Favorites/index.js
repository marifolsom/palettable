import React, { Component } from 'react';
import { Text, View, ScrollView, AlertIOS } from 'react-native';
import FavoritedPalette from '../../components/FavoritedPalette';
import * as firebase from 'firebase';

class FavoritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: []
    }
    this.fetchFavoritedPalettes = this.fetchFavoritedPalettes.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
      // If the user is not logged in alert them to log in or register
      if (!firebase.auth().currentUser) {
        console.log('Please log in or create an account to view your favorites.');
        AlertIOS.alert(
          'Please log in or create an account to view your favorites.'
        )
      }
      this.fetchFavoritedPalettes();
    }
    if (event.id === 'bottomTabReselected') {
      console.log('Tab reselected!');
    }
  }

  async fetchFavoritedPalettes() {
    // Get the current user
    console.log('current user:', await firebase.auth().currentUser);
    const currentUser = await firebase.auth().currentUser;
    // Make a variable for 'this' so that it can be used inside of the firebase function
    const self = this;
    let palettes = []
    // Retrieve new palettes as they are added to the database
    firebase.database().ref(currentUser.uid).child('favorites').on('child_added', snapshot => {
      const newPalette = snapshot.val().palette;
      palettes.push(newPalette);
    })
    // Update the state
    self.setState({
      palettes: palettes
    })
  }

  render() {
    console.log(this.state.palettes);
    const palettes = this.state.palettes.map((palette, index) => {
      // console.log('a palette:', palette);
      return <FavoritedPalette key={index} palette={palette} />
    })

    return (
      <ScrollView>
        <Text>Favorited Palettes:</Text>
        <View>
          {palettes}
        </View>
      </ScrollView>
    )
  }
}

export default FavoritesScreen;
