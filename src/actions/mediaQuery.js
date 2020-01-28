import {Dimensions, Platform} from 'react-native';
import isElectron from 'is-electron';
import {vars} from '../assets/styles/Vars';

export const isWeb = () => {
  return !isElectron() && Platform.OS === 'web';
};
export const isDesktop = () => {
  return isElectron();
};
export const isLandscape = () => {
  const dim = Dimensions.get('window');
  return dim.width > dim.height;
};
export const isPortrait = () => {
  const dim = Dimensions.get('window');
  return dim.width <= dim.height;
};
export const isScreenDesktop = () => {
  const dim = Dimensions.get('window');
  return dim.width > vars.WIDTH_SCREEN_DESKTOP;
};
export const isWidthMin = min => {
  const dim = Dimensions.get('window');
  return dim.width > min;
};
export const isHeightMin = min => {
  const dim = Dimensions.get('window');
  return dim.height > min;
};
