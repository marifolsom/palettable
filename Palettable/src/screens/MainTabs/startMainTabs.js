import { Navigation } from 'react-native-navigation';

const startTabs = (tabIndex) => {
  Navigation.startTabBasedApp({
    tabs: [
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
        // label: 'Login',
        // title: 'Login'
      }
    ],
    tabsStyle: {
      // tabIndex is passed in by the tabHandler in MainMenu depending on which tab is pressed
      initialTabIndex: tabIndex
    }
  })
}

export default startTabs;
