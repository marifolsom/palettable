import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

import ViewWindow from './app/components/ViewWindow'

export default class App extends Component {
  render() {
    return (
      <View>
        <ViewWindow />
      </View>
    )
  }
}

AppRegistry.registerComponent('App', () => App);
