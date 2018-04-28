import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

import MainMenu from '../MainMenu';
import Discover from '../Discover';
import Generate from '../Generate';
import Favorites from '../Favorites';
import NavBar from '../NavBar';
import Login from '../Login';
import Register from '../Register';

export default class ViewWindow extends Component {
  render() {
    return (
      <View>
        {/* <MainMenu /> */}
        <Discover />
      </View>
    )
  }
}
