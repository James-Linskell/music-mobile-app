import { Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


/**
 * Default layouts constant created by Expo ('expo init'). Provides screen dimensions.
 */
export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
