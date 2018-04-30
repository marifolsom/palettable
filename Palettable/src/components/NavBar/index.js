import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Fonts } from '../../utils/Fonts';

class NavBar extends Component {
  render() {
    return (
      <View style={styles.navBar}>
        {/* <Text style={styles.navBarText}>LOGIN</Text>
        <Text style={styles.navBarText}>REGISTER</Text> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navBarText: {
    fontSize: 30,
    fontFamily: Fonts.Quicksand,
    opacity: 0.85,
    color: '#000000'
  }
})

export default NavBar;
