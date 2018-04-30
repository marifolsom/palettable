import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';

class MainMenuScreen extends Component {
  navHandler(tabsArray) {
    const tabs = { tabs: tabsArray }
    startMainTabs(tabs);
  }

  render() {
    const tabsArray = [
      {
        screen: 'palettable.DiscoverScreen',
        label: 'Discover',
        title: 'Discover'
      },
      {
        screen: 'palettable.GenerateScreen',
        label: 'Generate',
        title: 'Generate'
      },
      {
        screen: 'palettable.FavoritesScreen',
        label: 'Favorites',
        title: 'Favorites'
      },
      {
        screen: 'palettable.AuthScreen',
        label: 'Login',
        title: 'Login'
      }
    ];

    return (
      <View>
        <Button title="Discover" onPress={() => this.navHandler(tabsArray)} />
        <Button title="Generate" onPress={() => this.navHandler(tabsArray)} />
        <Button title="Favorites" onPress={() => this.navHandler(tabsArray)} />
        <Button title="Login" onPress={() => this.navHandler(tabsArray)} />
      </View>
    )
  }
}

export default MainMenuScreen;
