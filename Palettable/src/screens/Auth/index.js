import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import RegisterLogin from '../../components/RegisterLogin';

class AuthScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RegisterLogin />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
})

export default AuthScreen;
