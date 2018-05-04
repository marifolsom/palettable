import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Palette from '../../components/Palette';
// import Camera from 'react-native-camera';
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
      paletteId: null,
      palette: []
    }
    this.generatePalette = this.generatePalette.bind(this);
    // this.takePicture = this.takePicture.bind(this);
    this.imagePicker = this.imagePicker.bind(this);
  }

  // // Make a function that prompts the user to take a photo, and stores that selected photo in the photoInfo state
  // async takePicture() {
  //   if (this.camera) {
  //     const data = await this.camera.capture();
  //     // console.log(data);
  //     // Image source needs an object with a uri property
  //     const photoInfo = { uri: data.path };
  //     this.setState({
  //       photoInfo: photoInfo
  //     })
  //   }
  // }

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
          photoInfo: response
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
            paletteId: response.outputs[0].id,
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
          <Palette hexValueArray={this.state.palette} paletteId={this.state.paletteId} />
        ) : (
          <View>
            {/* If no photo has been taken, display the camera */}
            {this.state.photoInfo === null ? (
              // <View>
              //   <Camera
              //     ref={cam => (this.camera = cam)}
              //     aspect={Camera.constants.Aspect.fill}
              //     type={Camera.constants.Type.back}
              //     style={styles.container}
              //     flashMode={Camera.constants.FlashMode.off}
              //     captureTarget={Camera.constants.CaptureTarget.disk}
              //     //captureTarget={Camera.constants.CaptureTarget.memory}
              //     permissionDialogTitle={"Permission to use camera"}
              //     permissionDialogMessage={"We need permission to use the camera on your phone"}
              //   />
              //   <View>
              //     <Button title="Take Photo" onPress={this.takePicture} />
              //   </View>
              // </View>
              <TouchableOpacity onPress={this.imagePicker} style={styles.container}>
                <Text>Upload or take a photo!</Text>
              </TouchableOpacity>
            ) : (
              // Otherwise display the taken image along with 'Generate!' and 'Retake' buttons
              <View style={styles.container}>
                <Image source={this.state.photoInfo} style={styles.container} />
                <View style={styles.buttons}>
                  {/* <Button title="Retake" onPress={this.takePicture} /> */}
                  <Button title="Generate Palette!" onPress={this.generatePalette} />
                </View>
              </View>
            )}
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
    width: 375
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default GenerateScreen;
