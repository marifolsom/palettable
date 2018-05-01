import { Navigation } from 'react-native-navigation';

const startTabs = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'palettable.DiscoverScreen',
        // icon: require('./assets/img/icons/paint-brush.png'),
        label: 'Discover',
        title: 'Discover'
      },
      {
        screen: 'palettable.GenerateScreen',
        // icon: require('./assets/img/icons/photo-camera.png'),
        label: 'Generate',
        title: 'Generate'
      },
      {
        screen: 'palettable.FavoritesScreen',
        // icon: require('./assets/img/icons/heart.png'),
        label: 'Favorites',
        title: 'Favorites'
      },
      {
        screen: 'palettable.AuthScreen',
        // icon: require('./assets/img/icons/user-1.png'),
        label: 'Login',
        title: 'Login'
      }
    ]
  })
}

export default startTabs;
