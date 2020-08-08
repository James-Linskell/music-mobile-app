import * as Linking from 'expo-linking';

/**
 * Default linking config for react navigation created by Expo.
 */
export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          PlaylistAnalyser: {
            screens: {
              PlaylistAnalyser: 'PlaylistAnalyserHome',
            },
          },
          SongAnalyser: {
            screens: {
              SongAnalyser: 'SongAnalyserHome',
            },
          },
          About: {
            screens: {
              About: 'AboutHome',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
