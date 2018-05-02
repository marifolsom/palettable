import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import { Fonts } from '../../utils/Fonts';

class MainMenuScreen extends Component {
  navHandler() {
    startMainTabs();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Palettable</Text>
        <Image source={require('Palettable/assets/img/palettable-logo.png')} style={styles.imageContainer} />
        <Button title="Discover" onPress={() => this.navHandler()} />
        <Button title="Generate" onPress={() => this.navHandler()} />
        <Button title="Favorites" onPress={() => this.navHandler()} />
        <Button title="Login" onPress={() => this.navHandler()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 40,
    fontFamily: Fonts.QuicksandMedium,
    textAlign: 'left',
    color: '#000000',
    opacity: 0.85,
  },
  imageContainer: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  }
})

export default MainMenuScreen;
