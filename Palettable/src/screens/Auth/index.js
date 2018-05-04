import React, { Component } from 'react';
import { Text, View, TextInput, Button, AlertIOS, StyleSheet, TouchableHighlight } from 'react-native';
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
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    try {
      await firebase.auth().signOut();
      console.log('Logged out');
      // Navigate to Main Menu
      setTimeout(() => {
        this.props.navigator.push({
          screen: 'palettable.MainMenuScreen'
        })
        // this.props.navigator.toggleNavBar({
        //   to: 'hidden',
        //   animated: false
        // })
      }, 1500)
    } catch (error) {
      console.log(error.toString());
      AlertIOS.alert(
        error.toString()
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Login />
        <Register />
        <View>
          <Button title="LOGOUT" onPress={this.logout} />
        </View>
        {/* <TouchableHighlight style={styles.button} onPress={this.logout}>
          <Text>LOGOUT</Text>
        </TouchableHighlight> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // button: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(92, 99,216, 1)',
  //   width: 300,
  //   height: 45,
  //   borderColor: 'transparent',
  //   borderWidth: 0,
  //   borderRadius: 5
  // }
})

export default AuthScreen;
