import React, { Component } from 'react';
import { Text, View, AlertIOS, StyleSheet, Image } from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import { Fonts } from '../../utils/Fonts';

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
      // Navigate to the 'Favorites' screen, the user is logged in
      // setTimeout(() => {
        this.props.navigator.switchToTab({
          tabIndex: 2
        })
      // }, 1500)
    } catch (error) {
      AlertIOS.alert(error.toString());
    }
    console.log('current user:', firebase.auth().currentUser);
  }

  async login() {
    console.log('Login:', this.state.email, this.state.password);
    try {
      await firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password);
      console.log('Logged In!');
      // Navigate to the 'Favorites' screen
      // setTimeout(() => {
        this.props.navigator.switchToTab({
          tabIndex: 2
        })
      // }, 1500)
    } catch (error) {
      AlertIOS.alert(error.toString());
    }
    console.log('current user:', firebase.auth().currentUser);
  }

  async logout() {
    // If the user is logged in, log them out
    if (firebase.auth().currentUser) {
      try {
        await firebase.auth().signOut();
        console.log('Logged out');
        // Navigate to 'Discover'
        // setTimeout(() => {
          this.props.navigator.switchToTab({
            tabIndex: 0
          })
        // }, 1500)
      } catch (error) {
        console.log(error.toString());
        AlertIOS.alert(error.toString());
      }
    } else {
      AlertIOS.alert('Not logged in.');
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.header}>Palettable</Text>
          <Image source={require('Palettable/assets/img/palettable-logo.png')} style={styles.image} />
        </View>
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
            <View>
              <Button block primary style={styles.button} onPress={this.login}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </Button>
              <Button block primary style={styles.button} onPress={this.register}>
                <Text style={styles.buttonText}>REGISTER</Text>
              </Button>
            </View>
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
    padding: 10,
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    fontFamily: Fonts.QuicksandMedium,
    color: '#000000'
  },
  logo: {
    alignItems: 'center'
  },
  image: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
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
