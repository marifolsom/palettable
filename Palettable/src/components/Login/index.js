import React, { Component } from 'react';
import { Text, View, Button, TextInput, AlertIOS } from 'react-native';
import firebase from 'firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.login = this.login.bind(this);
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
      <View>
        <Text>Login</Text>
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
        <Button title="Login" onPress={this.login} />
      </View>
    )
  }
}

export default Login;
