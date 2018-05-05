import { Navigation } from 'react-native-navigation';
import AuthScreen from './src/screens/Auth';
import MainMenuScreen from './src/screens/MainMenu';
import DiscoverScreen from './src/screens/Discover';
import GenerateScreen from './src/screens/Generate';
import FavoritesScreen from './src/screens/Favorites';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyC21kE4EqLrpOrNUP_Xs5yasm4PVbrgOT0',
  authDomain: 'palettable-app.firebaseapp.com',
  databaseURL: 'https://palettable-app.firebaseio.com',
  projectId: 'palettable-app',
  storageBucket: 'palettable-app.appspot.com',
  messagingSenderId: '456509266864'
}
firebase.initializeApp(config);

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

// Ignore warnings about remote debugger and tab switching
console.ignoredYellowBox = ['Remote debugger', 'Possible Unhandled Promise Rejection (id: 0)', 'Possible Unhandled Promise Rejection (id: 1)'];
