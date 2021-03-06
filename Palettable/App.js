import { Navigation } from 'react-native-navigation';
import * as firebase from 'firebase';
import AuthScreen from './src/screens/Auth';
import MainMenuScreen from './src/screens/MainMenu';
import DiscoverScreen from './src/screens/Discover';
import GenerateScreen from './src/screens/Generate';
import FavoritesScreen from './src/screens/Favorites';

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
// Navigation.startSingleScreenApp({
//   screen: {
//     screen: 'palettable.MainMenuScreen'
//   }
// })

Navigation.startTabBasedApp({
  tabs: [
    // {
    //   screen: 'palettable.MainMenuScreen',
    //   icon: require('Palettable/assets/img/icons/home.png'),
    //   label: 'Home',
    //   title: 'Home'
    // },
    {
      screen: 'palettable.DiscoverScreen',
      icon: require('Palettable/assets/img/icons/paint-brush.png'),
      label: 'Discover',
      title: 'Discover'
    },
    {
      screen: 'palettable.GenerateScreen',
      icon: require('Palettable/assets/img/icons/photo-camera.png'),
      label: 'Generate',
      title: 'Generate'
    },
    {
      screen: 'palettable.FavoritesScreen',
      icon: require('Palettable/assets/img/icons/heart.png'),
      label: 'Favorites',
      title: 'Favorites'
    },
    {
      screen: 'palettable.AuthScreen',
      icon: require('Palettable/assets/img/icons/user-1.png'),
      label: 'Account',
      title: 'Account'
    }
  ],
  tabsStyle: {
    // Start at auth
    initialTabIndex: 3
  }
})

// Ignore warnings about remote debugger and tab switching
console.ignoredYellowBox = ['Remote debugger', 'Possible Unhandled Promise Rejection', 'Native TextInput', 'Unhandled JS Exception'];
