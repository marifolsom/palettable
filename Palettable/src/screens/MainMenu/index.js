import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';

class MainMenuScreen extends Component {
  navHandler() {
    startMainTabs();
  }

  render() {
    return (
      <View>
        <Button title="Discover" onPress={this.navHandler} />
        <Button title="Generate" onPress={this.navHandler} />
      </View>
    )
  }
}

export default MainMenuScreen;
