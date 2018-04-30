import React, { Component } from 'react';
import { StyleSheet, StatusBar, Platform, Text, View } from 'react-native';

import Discover from '../Discover';
import Generate from '../Generate';
import Favorites from '../Favorites';
import Auth from '../Auth';

class ViewWindow extends Component {
  render() {
    return (
      <View style={styles.view}>
        <StatusBar barStyle="dark-content" hidden={false} />
        <Discover />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    top: 20
  }
  // statusBar: {
  //   height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
  // }
})

export default ViewWindow;
