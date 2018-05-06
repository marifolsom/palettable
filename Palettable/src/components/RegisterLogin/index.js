import React, { Component } from 'react';
import { AlertIOS, Image, Keyboard, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Fonts } from '../../utils/Fonts';
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
    this.tabHandler = this.tabHandler.bind(this);
  }

  // Make a function that switches to a certain tabIndex after 1.5 seconds
  tabHandler(tabIndex) {
    setTimeout(() => {
      this.props.navigator.switchToTab({
        tabIndex: tabIndex
      })
    }, 1500)
  }

  // Make a function that registers a new user, dismisses the keyboard, and redirects the user to the 'Favorites' screen
  async register() {
    console.log('Register:', this.state.email, this.state.password);
    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
      AlertIOS.alert(
        'Account created',
        null,
        [
          {
            text: 'OK',
            onPress: this.tabHandler(2)
          }
        ]
      )
    } catch (error) {
      AlertIOS.alert(error.toString());
    }
    console.log('current user:', firebase.auth().currentUser);
    Keyboard.dismiss();
  }

  // Make a function that logs a user in, dismisses the keyboard, and redirects the user to the 'Favorites' screen
  async login() {
    console.log('Login:', this.state.email, this.state.password);
    try {
      await firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password);
      AlertIOS.alert(
        'Logged in!',
        null,
        [
          {
            text: 'OK',
            onPress: this.tabHandler(2)
          }
        ]
      )
    } catch (error) {
      AlertIOS.alert(error.toString());
    }
    console.log('current user:', firebase.auth().currentUser);
    Keyboard.dismiss();
  }

  // Make a function that logs a user out if they're logged in, and redirects the user to the 'Discover' screen
  async logout() {
    if (firebase.auth().currentUser) {
      try {
        await firebase.auth().signOut();
        AlertIOS.alert(
          'Logged out',
          null,
          [
            {
              text: 'OK',
              onPress: this.tabHandler(0)
            }
          ]
        )
      } catch (error) {
        console.log(error.toString());
        AlertIOS.alert(error.toString());
      }
    } else {
      AlertIOS.alert('Not logged in');
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
            <View >
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
    fontSize: 38,
    fontFamily: Fonts.QuicksandMedium,
    color: '#000000'
  },
  logo: {
    alignItems: 'center'
  },
  image: {
    height: 82,
    width: 82,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    marginBottom: 0
  },
  button: {
    margin: 20,
    marginBottom: 0
  },
  buttonText: {
    fontSize: 18,
    fontFamily: Fonts.QuicksandMedium,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

export default RegisterLogin;
