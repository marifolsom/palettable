import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  // inputHandler(evt) {
  //   console.log(evt.target.value);
  // }

  render() {
    console.log(this.state);
    return (
      <View>
        <Text>Login</Text>
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
        {/* <Button title="Log in" /> */}
      </View>
    )
  }
}

export default Login;
