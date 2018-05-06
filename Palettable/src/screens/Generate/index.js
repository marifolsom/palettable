import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Palette from '../../components/Palette';
import Clarifai from 'clarifai';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';

// Initialize with Clarifai api key
const app = new Clarifai.App({
 apiKey: 'aec16f562f384712b9cd7dcec8071cb3'
})

class GenerateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoInfo: null,
      palette: []
    }
    this.generatePalette = this.generatePalette.bind(this);
    this.imagePicker = this.imagePicker.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
      this.imagePicker();
    }
    if (event.id === 'bottomTabReselected') {
      console.log('Tab reselected!');
    }
  }

  // Make a function that prompts the user to take or upload a photo, and stores that selected photo in the photoInfo state
  imagePicker() {
    // Set options
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }
    // Display the image picker menu, and log the response based on the user's actions
    ImagePicker.showImagePicker(options, response => {
      console.log('Image Picker Response:', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Update the state
        this.setState({
          photoInfo: response,
          palette: []
        })
      }
    })
  }

  // Make a function that takes the photoInfo URI, extracts the prominent colors, and updates the state with the photo's palette
  generatePalette() {
    // If using react-native-image-picker trim off the 'file://'
    const uri = this.state.photoInfo.uri.substr(7);
    console.log(uri);
    // Covert URI to base64 before putting into Clarifai
    RNFetchBlob.fs.readFile(uri, 'base64')
      .then((photoData) => {
        // React Native doesn't have a process.nextTick, so polyfill it with setImmediate
        process.nextTick = setImmediate;
        // Make a call to the Clarifai Predict API's Color Model
        app.models.predict('eeed0b6733a644cea07cf4c60f87ebb7', { base64: photoData })
        .then((response) => {
          console.log('Clarifai Response:', response);
          let hexValueArray = [];
          // Go through each color that's extracted
          response.outputs[0].data.colors.forEach(color => {
            // Remove hashtag for formatting
            const hexValue = color.raw_hex.substr(1);
            // Limit length of array to 5
            if (hexValueArray.length < 5) {
              hexValueArray.push(hexValue);
            }
          })
          console.log(response.outputs[0].id);
          this.setState({
            palette: hexValueArray
          })
        })
      })
      .catch((error) => {
        console.log('Error:', error.message);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* If there is a generated palette, display the palette component with the passed hexValueArray */}
        {this.state.palette.length > 0 ? (
          <Palette hexValueArray={this.state.palette} />
        ) : (
          <View>
            {/* Otherwise display the taken image along with 'Generate!' and 'Retake' buttons */}
            <View style={styles.container}>
              {this.state.photoInfo !== null && this.state.photoInfo.isVertical === true ? (
                <Image source={this.state.photoInfo} style={styles.container} />
              ) : (
                <Image source={this.state.photoInfo} style={styles.horizontal} />
              )}
              <View style={styles.buttons}>
                <Button title="Generate Palette!" onPress={this.generatePalette} />
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    width: 375
  },
  horizontal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 281.25,
    width: 375
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default GenerateScreen;
