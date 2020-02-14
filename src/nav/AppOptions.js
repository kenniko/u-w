// import {Platform} from 'react-native';

const AppOptions = {
  initialRouteName: 'launch',
  headerMode: 'none',
  // defaultNavigationOptions: {
  //   animationEnabled: false,
  //   headerStyle: {
  //     display: Platform.OS == 'web' ? 'none' : 'flex',
  //     // elevation: 0, // remove shadow on Android
  //     // shadowOpacity: 0, // remove shadow on iOS
  //     // boxShadow: 'none', // remove shadow on Web
  //     // opacity: 0,
  //     // pointerEvents: 'none',
  //   },
  // },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
    },
  }),
};

export default AppOptions;
