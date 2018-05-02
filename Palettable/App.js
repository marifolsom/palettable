import { Navigation } from 'react-native-navigation';
// import { registerScreens } from './src/screens';
// registerScreens()

import AuthScreen from './src/screens/Auth';
import MainMenuScreen from './src/screens/MainMenu';
import DiscoverScreen from './src/screens/Discover';
import GenerateScreen from './src/screens/Generate';
import FavoritesScreen from './src/screens/Favorites';

// Register all of the app's screens
// These registered screens can be accessed anywhere in the app
Navigation.registerComponent('palettable.AuthScreen', () => AuthScreen);
Navigation.registerComponent('palettable.MainMenuScreen', () => MainMenuScreen);
Navigation.registerComponent('palettable.DiscoverScreen', () => DiscoverScreen);
Navigation.registerComponent('palettable.GenerateScreen', () => GenerateScreen);
Navigation.registerComponent('palettable.FavoritesScreen', () => FavoritesScreen);

// Start the app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'palettable.MainMenuScreen'
  }
})
