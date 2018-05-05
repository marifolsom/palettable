import React, { Component } from 'react';
import { Text, View } from 'react-native';
import FavoritedPalette from '../../components/FavoritedPalette';

class FavoritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: {}
    }
    this.fetchFavoritedPalettes = this.fetchFavoritedPalettes.bind(this);
  }

  fetchFavoritedPalettes() {

  }

  render() {
    // const palettes = this.state.palettes.map(palette => {
    //   return <FavoritedPalette />
    // })

    return (
      <View>
        <Text>Favorited Palettes:</Text>
        <View>
          {/* {palettes} */}
        </View>
      </View>
    )
  }
}

export default FavoritesScreen;
