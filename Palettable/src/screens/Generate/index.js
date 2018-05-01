import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import ImagePicker from 'react-native-image-picker';

class GenerateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null
    }
    this.selectImageHandler = this.selectImageHandler.bind(this);
  }

  componentDidMount() {
    // // When the Generate tab is clicked, prompt the user to take or upload a photo
    // // Right now, this is triggered when any of the menu items are clicked...
    // this.selectImageHandler();
  }

  selectImageHandler() {
    ImagePicker.showImagePicker({ title: 'Take a picture or select one from your library!' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Image source needs an object with a uri property
        let source = { uri: response.uri };
        this.setState({
          selectedImage: source
        })
      }
    })
  }

  render() {
    return (
      <View>
        <Button title="Upload an Image!" onPress={this.selectImageHandler} />
      </View>
    )
  }
}

export default GenerateScreen;
