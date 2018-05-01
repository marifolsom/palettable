import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import { getAllSwatches } from 'react-native-palette';

class GenerateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Store the selected image's URI path
      imageSource: null,
      palette: null
    }
    this.imagePickerHandler = this.imagePickerHandler.bind(this);
    this.generatePaletteHandler = this.generatePaletteHandler.bind(this);
  }

  // // This would directly launch the camera, skipping the alert dialog
  // // Not sure which option I want to do yet
  // imagePickerHandler() {
  //   ImagePicker.launchCamera(response  => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
  //       // Image source needs an object with a uri property
  //       let source = { uri: response.uri };
  //       this.setState({
  //         image: {
  //           value: source
  //         }
  //       })
  //     }
  //   });
  // }

  imagePickerHandler() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.showImagePicker(options, response => {
      console.log('Image Picker Response:', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Image source needs an object with a URI property
        let path = { uri: response.uri };
        this.setState({
          imageSource: path
        })
        // console.log(this.state.imageSource, typeof this.state.imageSource);
      }
    })
  }

  generatePaletteHandler() {
    const path = this.state.imageSource.uri;
    console.log(path);
    getAllSwatches({}, path, (error, swatches) => {
      if (error) {
        console.log(error);
      } else {
        console.log(swatches);
        // swatches.sort((a, b) => {
        //   return b.population - a.population;
        // })
        swatches.forEach(swatch => {
          console.log(swatch.swatchInfo);
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.imageSource === null ? (
          <TouchableOpacity onPress={this.imagePickerHandler} style={styles.imageContainer}>
            <Text>Upload or take a photo!</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.imageContainer}>
            <Image source={this.state.imageSource} style={styles.imageContainer} />
            <View style={styles.buttons}>
              <Button title="Retake" onPress={this.imagePickerHandler} />
              <Button title="Generate!" onPress={this.generatePaletteHandler} />
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
    alignItems: 'center'
  },
  // Need to figure out how to handle horizontal photos -- utilize isVertical property
  imageContainer: {
    height: 500,
    width: 375,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default GenerateScreen;
