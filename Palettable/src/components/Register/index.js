import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import firebase from 'firebase';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: ''
    }
  }

  async signup(email, pass) {
    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(email, pass);
      console.log("Account created");
      // Navigate to the Home page, the user is auto logged in
    } catch (error) {
      console.log(error.toString())
    }
  }

  // inputHandler(evt) {
  //   console.log(evt.target.value);
  // }

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
          <TextInput
            label="Confirm Password"
            autoCorrect={false}
            placeholder="*******"
            value={this.state.passwordConfirm}
            onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
          />
          {/* <Button title="Log in" /> */}
      </View>
    )
  }
}

export default Register;
