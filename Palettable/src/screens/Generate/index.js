import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { getAllSwatches } from 'react-native-palette';
import rgbToHex from 'rgb-hex';
import Palette from '../../components/Palette';
import { RNCamera } from 'react-native-camera';

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

  componentDidMount() {
    // // All nav tab page components are mounted at the same time, so this alert happens when any of the tabs are clicked...
    // // Need to figure out how to only do it when the 'Generate' button is pressed
    // if (this.state.imageResponse === null) {
    //   this.imagePickerHandler();
    // }
  }

  // Make a function that prompts the user to take or upload a photo, and stores that selected photo in the imageResponse state
  imagePickerHandler() {
    // Set options
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        cameraRoll: true
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
    // react-native-palette requires a origURL that looks like this:
    // assets-library://asset/asset.HEIC?id=FFA54FF0-392F-432B-B408-3926AFD64DCA&ext=HEIC
    // const path =  Platform.OS === 'ios' ? response.origURL : response.path;
    const path = this.state.imageResponse.origURL;
    console.log(path);
    getAllSwatches({ quality: 'medium' }, path, (error, swatches) => {
      if (error) {
        console.log(error);
      } else {
        hexValueArray = [];
        swatches.sort((a, b) => {
          return b.population - a.population;
        })
        swatches.forEach(swatch => {
          // A little janky, may be a better way to do this?
          // console.log(swatch.color); // looks like: rgba(216, 194, 173, 1)
          rgbaArray = swatch.color.split(/[(), ]/);
          // console.log(rgbaArray); // looks like: ["rgba", "121", "", "121", "", "138", "", "1", ""]
          const hexValue = rgbToHex(Number(rgbaArray[1]), Number(rgbaArray[3]), Number(rgbaArray[5]));
          hexValueArray.push(hexValue);
        })
        this.setState({
          palette: hexValueArray
        })
      }
    })
  }

  render() {
    return (
      <View View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>

        {/* {this.state.palette.length > 0 ? (
          <View>
            <Palette hexValueArray={this.state.palette} />
          </View>
        ) : (
          <View>
            {this.state.imageResponse === null ? (
              // <TouchableOpacity style={styles.imageContainerVertical}>
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
        )} */}
      </View>
    )
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data);
    }
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
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  buttonContainer: {
    justifyContent: "flex-end"
  }
})

export default GenerateScreen;
