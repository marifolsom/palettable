import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import Login from '../../components/Login';
import Register from '../../components/Register';

class AuthScreen extends Component {
  render() {
    return (
      <View>
        <Login />
        <Register />
      </View>
    )
  }
}

export default AuthScreen;
