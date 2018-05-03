import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity, Platform } from 'react-native';
import { getAllSwatches } from 'react-native-palette';
import rgbToHex from 'rgb-hex';
import Palette from '../../components/Palette';
import Camera from 'react-native-camera';

class GenerateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoInfo: null,
      palette: []
    }
    // this.imagePickerHandler = this.imagePickerHandler.bind(this);
    this.takePictureHandler = this.takePictureHandler.bind(this);
    this.generatePaletteHandler = this.generatePaletteHandler.bind(this);
  }

  // Make a function that prompts the user to take a photo, and stores that selected photo in the photoInfo state
  takePictureHandler = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.capture();
      // Image source needs an object with a uri property
      // Still playing around with the URI and getting the taken photo to show
      pathHTTPS = `https://${data.path}`
      const path = { uri: pathHTTPS, path: data.path }
      this.setState({
        photoInfo: path
      })
    }
  }

  // Make a function that takes the photoInfo, extracts the prominent colors, and updates the state with the photo's palette
  generatePaletteHandler() {
    console.log(this.state);
    // react-native-palette requires a origURL that looks like this:
    // assets-library://asset/asset.HEIC?id=FFA54FF0-392F-432B-B408-3926AFD64DCA&ext=HEIC
    const path = this.state.photoInfo.path;
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
      <View style={styles.container}>
        {/* If there is a generated palette, display the palette component with the passed hexValueArray */}
        {this.state.palette.length > 0 ? (
          <Palette hexValueArray={this.state.palette} />
        ) : (
          <View>
            {/* If no photo has been taken, display the camera */}
            {this.state.photoInfo === null ? (
              <View>
                <Camera
                  ref={cam => (this.camera = cam)}
                  aspect={Camera.constants.Aspect.fill}
                  type={Camera.constants.Type.back}
                  style={styles.preview}
                  flashMode={Camera.constants.FlashMode.off}
                  permissionDialogTitle={"Permission to use camera"}
                  permissionDialogMessage={"We need permission to use the camera on your phone"}
                />
                <View>
                  <Button title="Take the picture!" onPress={this.takePictureHandler} />
                </View>
              </View>
            ) : (
              // Otherwise, display the taken image along with a 'Generate!' button
              <View style={styles.imageContainer}>
                <Image source={this.state.photoInfo} style={styles.imageContainer} />
                <View style={styles.buttons}>
                  {/* <Button title="Retake" onPress={this.imagePickerHandler} /> */}
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    width: 375
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: 500,
    width: 375
  }
})

export default GenerateScreen;
