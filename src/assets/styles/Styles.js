import {StyleSheet} from 'react-native';
import {vars} from './Vars';

export default StyleSheet.create({
  isHide: {
    width: 0,
    height: 0,
    display: 'none',
  },
  isShow: {
    width: 'auto',
    height: 'auto',
  },
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: vars.GAP_H_CONTAINER,
  },
  conCenter: {
    justifyContent: 'center',
  },
  textTitle: {
    fontFamily: 'Rubik-Medium',
    fontWeight: '500',
    fontSize: 28,
    lineHeight: 32,
    color: vars.COLOR_TEXT_TITLE,
    marginVertical: vars.GAP_TEXT,
  },
  textBody: {
    fontFamily: 'Rubik-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: vars.COLOR_TEXT_BODY,
    marginVertical: vars.GAP_TEXT,
  },
  textSeparator: {
    fontFamily: 'Rubik-Medium',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 22,
    alignSelf: 'center',
    color: vars.COLOR_TEXT_BODY,
    marginVertical: vars.GAP_TEXT,
  },
  textError: {
    fontFamily: 'Rubik-Regular',
    alignSelf: 'center',
    marginVertical: vars.GAP_TEXT,
    fontSize: 12,
    color: vars.COLOR_TEXT_ERROR,
  },
  textErrorInput: {
    fontFamily: 'Rubik-Regular',
    alignSelf: 'flex-end',
    marginTop: vars.GAP_TEXT,
    fontSize: 12,
    color: vars.COLOR_TEXT_ERROR,
  },
  inputField: {
    marginVertical: vars.GAP_INPUT,
  },
  inputLabel: {
    fontFamily: 'Rubik-Medium',
    fontWeight: '500',
    color: vars.COLOR_TEXT_LABEL,
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 4,
  },
  inputPrimary: {
    height: vars.HEIGHT_INPUT,
    fontSize: 15,
    paddingHorizontal: vars.PADDING_INPUT,
    color: vars.COLOR_TEXT_TITLE,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: vars.COLOR_INPUT_BORDER,
    fontFamily: 'Rubik-Regular',
  },
  //   footerViewStyle: {
  //     paddingLeft: 28,
  //     paddingRight: 28,
  //     marginTop: 45,
  //     flexDirection: 'column',
  //   },
  //   footerTextStyle: {
  //     alignSelf: 'center',
  //     fontSize: 12,
  //     color: '#8e8e8e',
  //   },
});

// const styles = {
//   containerStyle: {
//     backgroundColor: '#fff',
//     flex: 1,
//   },
//   logoViewStyle: {
//     marginTop: 35,
//     marginBottom: 5,
//     alignItems: 'center',
//   },
//   logoTextTitle: {
//     color: '#7d62d9',
//     fontSize: 30,
//     fontWeight: '600',
//   },
//   logoTextSubTitle: {
//     color: '#8e8e8e',
//     fontSize: 13,
//     fontWeight: '500',
//   },
//   linkTextSubTitle: {
//     color: '#7d62d9',
//     fontSize: 13,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   deleteText: {
//     color: '#a94442',
//     fontSize: 13,
//     fontWeight: '500',
//     textAlign: 'right',
//   },
//   inputViewStyle: {
//     paddingLeft: 8,
//     paddingRight: 8,
//     marginLeft: 28,
//     marginRight: 28,
//     marginTop: 8,
//   },
//   inputStyle: {
//     alignItems: 'center',
//     fontSize: 13,
//     backgroundColor: '#fff',
//   },
//   buttonStyle: {
//     paddingLeft: 12,
//     paddingRight: 12,
//     marginTop: 30,
//   },
//   linkStyle: {
//     alignItems: 'center',
//     paddingLeft: 12,
//     paddingRight: 12,
//     marginTop: 30,
//   },
//   errorTextStyle: {
//     alignSelf: 'center',
//     fontSize: 12,
//     color: '#e03131',
//   },
//   footerViewStyle: {
//     paddingLeft: 28,
//     paddingRight: 28,
//     marginTop: 45,
//     flexDirection: 'column',
//   },
//   footerTextStyle: {
//     alignSelf: 'center',
//     fontSize: 12,
//     color: '#8e8e8e',
//   },
// };

// export default styles;
