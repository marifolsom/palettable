import React, { Component } from 'react';
import { Text, View, TextInput, Button, AlertIOS, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

class RegisterLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register() {
    console.log('Register:', this.state.email, this.state.password);
    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
      console.log('Account created');
      // Navigate to the 'Discover' tab, the user is logged in
      setTimeout(() => {
        this.props.navigator.switchToTab({
          tabIndex: 0
        })
      }, 1500)
    } catch (error) {
      console.log(error.toString());
      AlertIOS.alert(
        error.toString()
      )
    }
    console.log('current user:', firebase.auth().currentUser);
  }

  async login() {
    console.log('Login:', this.state.email, this.state.password);
    try {
      await firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password);
      console.log('Logged In!');
      // Navigate to the Home page
      setTimeout(() => {
        this.props.navigator.switchToTab({
          tabIndex: 2
        })
      }, 1500)
    } catch (error) {
      console.log(error.toString());
      AlertIOS.alert(
        error.toString()
      )
    }
    console.log('current user:', firebase.auth().currentUser);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Register</Text>
          <TextInput
            label="Email Address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="you@domain.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            label="Password"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="*******"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <Button title="REGISTER" onPress={this.register} />
          <Button title="LOGIN" onPress={this.login} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
})

export default RegisterLogin;
