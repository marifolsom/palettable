import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import Login from '../../components/Login';
import Register from '../../components/Register';
import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyC21kE4EqLrpOrNUP_Xs5yasm4PVbrgOT0',
  authDomain: 'palettable-app.firebaseapp.com',
  databaseURL: 'https://palettable-app.firebaseio.com',
  projectId: 'palettable-app',
  storageBucket: 'palettable-app.appspot.com',
  messagingSenderId: '456509266864'
}
firebase.initializeApp(config);


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
