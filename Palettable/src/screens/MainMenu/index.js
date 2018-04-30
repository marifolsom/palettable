import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';

export default class MainMenuScreen extends Component {
  discoverHandler() {
    startMainTabs();
  }

  generateHandler() {
    startMainTabs();
  }

  render() {
    return (
      <View>
        <Button title="Discover" onPress={this.discoverHandler} />
        <Button title="Generate" onPress={this.generateHandler} />
      </View>
    )
  }
}
