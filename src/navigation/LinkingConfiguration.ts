import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'home',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'settings',
            },
          },
        },
      },
      CityDetails: '*',
      NotFound: '*',
    },
  },
};
