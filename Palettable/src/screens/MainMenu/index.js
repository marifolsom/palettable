import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import { Fonts } from '../../utils/Fonts';

class MainMenuScreen extends Component {
  constructor(props) {
    super(props);
    this.discoverTabHandler = this.discoverTabHandler.bind(this);
    this.generateTabHandler = this.generateTabHandler.bind(this);
    this.authTabHandler = this.authTabHandler.bind(this);
  }

  discoverTabHandler() {
    this.props.navigator.push({
      screen: 'palettable.DiscoverScreen'
    })
    startMainTabs(0);
  }

  generateTabHandler() {
    this.props.navigator.push({
      screen: 'palettable.GenerateScreen'
    })
    startMainTabs(1);
  }

  authTabHandler() {
    this.props.navigator.push({
      screen: 'palettable.AuthScreen'
    })
    startMainTabs(3);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Palettable</Text>
        <Image source={require('Palettable/assets/img/palettable-logo.png')} style={styles.imageContainer} />
        <Button title="Discover" onPress={this.discoverTabHandler} />
        <Button title="Generate" onPress={this.generateTabHandler} />
        <Button title="Login or Register" onPress={this.authTabHandler} />
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
    color: '#000000',
    // opacity: 0.85
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
