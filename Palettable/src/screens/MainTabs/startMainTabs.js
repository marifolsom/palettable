import { Navigation } from 'react-native-navigation';

export function startTabs() {
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'palettable.DiscoverScreen',
        label: 'Discover',
        title: 'Discover'
      },
      {
        screen: 'palettable.GenerateScreen',
        label: 'Generate',
        title: 'Generate'
      },
      {
        screen: 'palettable.AuthScreen',
        label: 'Login',
        title: 'Login'
      }
    ]
  })
}

export default startTabs;
