import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity, Platform } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import { getAllSwatches } from 'react-native-palette';
import rgbToHex from 'rgb-hex';
import Palette from '../../components/Palette';

class GenerateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Store the selected image's URI path
      imageResponse: null,
      palette: []
    }
    this.imagePickerHandler = this.imagePickerHandler.bind(this);
    this.generatePaletteHandler = this.generatePaletteHandler.bind(this);
  }

  // // This would directly launch the camera, skipping the alert dialog
  // // Not sure which option I want to do yet
  // imagePickerHandler() {
  //   ImagePicker.launchCamera(response  => {
  //     console.log('Image Picker Response:', response);
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
  //       // Update the state
  //       this.setState({
  //         imageResponse: response
  //       })
  //     }
  //   })
  // }

  // Make a function that prompts the user to take or upload a photo, and stores that selected photo in the imageResponse state
  imagePickerHandler() {
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
          imageResponse: response
        })
      }
    })
  }

  // Make a function that takes the imageResponse, extracts the prominent colors, and updates the state with the photo's palette
  generatePaletteHandler() {
    // const path =  Platform.OS === 'ios' ? response.origURL : response.path;
    const path = this.state.imageResponse.origURL;
    console.log(path);
    // Options are 'threshold' (determines whether white or black text will be selected to contrast with the selected color) and 'quality' (higher quality extracts more colors) -- by default the values are 0.179 and 'low'
    // Just sticking with the default for now
    getAllSwatches({ quality: 'medium' }, path, (error, swatches) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(swatches);
        hexValueArray = [];
        swatches.sort((a, b) => {
          return b.population - a.population;
        })
        swatches.forEach(swatch => {
          // console.log(swatch.color); // looks like: rgba(216, 194, 173, 1)
          rgbaArray = swatch.color.split(/[(), ]/);
          // console.log(rgbaArray); // looks like: ["rgba", "121", "", "121", "", "138", "", "1", ""]
          const hexValue = rgbToHex(Number(rgbaArray[1]), Number(rgbaArray[3]), Number(rgbaArray[5]));
          // console.log(hexValue);
          hexValueArray.push(hexValue);
        })
        this.setState({
          palette: hexValueArray
        })
        // console.log(hexValueArray);
      }
    })
  }

  render() {
    return (
      <View>
        {this.state.palette.length > 0 ? (
          <View>
            <Palette hexValueArray={this.state.palette} />
          </View>
        ) : (
          <View>
            {this.state.imageResponse === null ? (
              <TouchableOpacity onPress={this.imagePickerHandler} style={styles.imageContainerVertical}>
                <Text>Upload or take a photo!</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.imageContainerVertical}>
                {this.state.imageResponse.isVertical === true ? (
                  <Image source={this.state.imageResponse} style={styles.imageContainerVertical} />
                ) : (
                  <Image source={this.state.imageResponse} style={styles.imageContainerHorizontal} />
                )}
                <View style={styles.buttons}>
                  <Button title="Retake" onPress={this.imagePickerHandler} />
                  <Button title="Generate!" onPress={this.generatePaletteHandler} />
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
    alignItems: 'center'
  },
  imageContainerVertical: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    width: 375
  },
  imageContainerHorizontal: {
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
