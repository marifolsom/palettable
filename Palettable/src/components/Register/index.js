import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import firebase from 'firebase';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  async signup(email, password) {
    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(email, password);
      console.log('Account created');
      // Navigate to the Home page, the user is auto logged in
    } catch (error) {
      console.log(error.toString())
    }
  }

  render() {
    return (
      <View>
        <Text>Register</Text>
          <TextInput
            label="Email Address"
            placeholder="you@domain.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            label="Password"
            autoCorrect={false}
            placeholder="*******"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          {/* <Button title="Register" /> */}
      </View>
    )
  }
}

export default Register;
