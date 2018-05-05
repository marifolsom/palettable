import React, { Component } from 'react';
import { Text, View, AlertIOS, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';

class RegisterLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async register() {
    console.log('Register:', this.state.email, this.state.password);
    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
      console.log('Account created');
      // Navigate to the 'Discover' tab, the user is logged in
      // setTimeout(() => {
        // this.props.navigator.switchToTab({
        //   tabIndex: 0
        // })
      // }, 1500)
    } catch (error) {
      console.log(error.toString());
      AlertIOS.alert(
        error.toString()
      )
    }
    console.log('current user:', await firebase.auth().currentUser);
  }

  async login() {
    console.log('Login:', this.state.email, this.state.password);
    try {
      await firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password);
      console.log('Logged In!');
      // Navigate to the 'Favorites' screen
      // setTimeout(() => {
        // this.props.navigator.switchToTab({
        //   tabIndex: 2
        // })
      // }, 1500)
    } catch (error) {
      console.log(error.toString());
      AlertIOS.alert(
        error.toString()
      )
    }
    console.log('current user:', await firebase.auth().currentUser);
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
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            <Button block primary style={styles.button} onPress={this.login}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </Button>
            <Button block primary style={styles.button} onPress={this.register}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </Button>
            <Button block primary style={styles.button} onPress={this.logout}>
              <Text style={styles.buttonText}>LOGOUT</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center'
  },
  button: {
    margin: 20,
    marginBottom: 0
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

export default RegisterLogin;
