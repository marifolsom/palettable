import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import { Fonts } from '../../utils/Fonts';

class MainMenuScreen extends Component {
  tabHandler(tabIndex) {
    // startMainTabs(tabIndex);
    this.props.navigator.switchToTab({
      tabIndex: tabIndex
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Palettable</Text>
        <Image source={require('Palettable/assets/img/palettable-logo.png')} style={styles.imageContainer} />
        <Button title="Discover" onPress={this.tabHandler.bind(this, 0)} />
        <Button title="Generate" onPress={this.tabHandler.bind(this, 1)} />
        <Button title="Login or Register" onPress={this.tabHandler.bind(this, 3)} />
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
    fontSize: 45,
    fontFamily: Fonts.QuicksandMedium,
    color: '#000000'
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
