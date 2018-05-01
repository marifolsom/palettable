import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import ImagePicker from 'react-native-image-picker';

class GenerateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Store the selected image's URI path
      imageSource: null
    }
    this.imagePickerHandler = this.imagePickerHandler.bind(this);
  }

  componentDidMount() {
    // // When the Generate tab is clicked, prompt the user to take or upload a photo
    // // Right now, this is triggered when any of the menu items are clicked...
    // this.imagePickerHandler();
  }

  // // This would directly launch the camera, skipping the alert dialog
  // // Not sure which option I want to do yet
  // cameraHandler() {
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
      console.log('Response =', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Image source needs an object with a URI property
        let source = { uri: response.uri };
        this.setState({
          imageSource: source
        })
        console.log(this.state.imageSource, typeof this.state.imageSource);
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.imagePickerHandler}>
          <View style={styles.imageContainer}>
            {this.state.imageSource === null ?
              <Text>Upload or take a photo!</Text> :
              <Image source={this.state.imageSource} style={styles.imageContainer} />
            }
          </View>
        </TouchableOpacity>
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
  imageContainer: {
    height: 500,
    width: 375,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default GenerateScreen;
