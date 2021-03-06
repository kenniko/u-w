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
    paddingVertical: vars.PADDING_CONTAINER,
    paddingHorizontal: vars.GAP_H_CONTAINER,
  },
  conCenter: {
    justifyContent: 'center',
  },
  textTitle: {
    fontFamily: 'Rubik-Medium',
    // fontWeight: '500',
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
  textBodyBlack: {
    fontFamily: 'Rubik-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: vars.COLOR_TEXT_TITLE,
    marginVertical: vars.GAP_TEXT,
  },
  textHelp: {
    fontFamily: 'Rubik-Regular',
    fontSize: 13,
    lineHeight: 15,
    color: vars.COLOR_TEXT_LABEL,
    marginVertical: vars.GAP_TEXT,
  },
  textDefault: {
    fontFamily: 'Rubik-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: vars.COLOR_TEXT_LABEL,
    marginVertical: vars.GAP_TEXT,
  },
  textLink: {
    fontFamily: 'Rubik-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: vars.COLOR_PRIMARY,
    marginVertical: vars.GAP_TEXT,
  },
  textLinkDanger: {
    fontFamily: 'Rubik-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: vars.COLOR_DANGER,
    marginVertical: vars.GAP_TEXT,
  },
  textBold: {
    fontFamily: 'Rubik-Bold',
  },
  textSeparator: {
    fontFamily: 'Rubik-Medium',
    // fontWeight: '500',
    fontSize: 15,
    lineHeight: 22,
    alignSelf: 'center',
    color: vars.COLOR_TEXT_BODY,
    marginVertical: vars.GAP_TEXT,
  },
  textVersion: {
    fontFamily: 'Rubik-Regular',
    fontSize: 13,
    lineHeight: 20,
    alignSelf: 'center',
    color: vars.COLOR_TEXT_BODY,
    marginVertical: vars.GAP_TEXT,
  },
  textError: {
    fontFamily: 'Rubik-Regular',
    alignSelf: 'center',
    marginVertical: vars.GAP_TEXT,
    fontSize: 12,
    color: vars.COLOR_ERROR,
  },
  textErrorInput: {
    fontFamily: 'Rubik-Regular',
    alignSelf: 'flex-end',
    marginTop: vars.GAP_TEXT,
    fontSize: 12,
    color: vars.COLOR_ERROR,
  },
  inputField: {
    marginVertical: vars.GAP_INPUT,
  },
  inputLabel: {
    fontFamily: 'Rubik-Medium',
    // fontWeight: '500',
    color: vars.COLOR_TEXT_LABEL,
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 4,
  },
  inputPrimary: {
    textAlignVertical: 'center',
    height: vars.HEIGHT_INPUT,
    fontSize: 15,
    paddingHorizontal: vars.PADDING_INPUT,
    color: vars.COLOR_TEXT_TITLE,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: vars.COLOR_INPUT_BORDER,
    fontFamily: 'Rubik-Regular',
    borderRadius: 3,
  },
  inputError: {
    borderColor: vars.COLOR_ERROR,
  },
  homeWrpContent: {
    width: '100%',
    maxWidth: 435,
    alignSelf: 'center',
  },
  homeWrpAction: {
    width: '100%',
    maxWidth: 350,
    // alignSelf: 'center',
  },
  homeButtonBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 30,
    paddingLeft: vars.GAP_H_CONTAINER,
    zIndex: 9,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  homeBrandLogo: {
    position: 'absolute',
    zIndex: 9,
    top: 30,
    left: '5%',
  },
  boxDash: {
    width: '100%',
    borderColor: '#D8E9FD',
    borderRadius: 10,
    borderWidth: 3,
    borderStyle: 'dashed',
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginVertical: 20,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    maxWidth: 540,
    width: '100%',
    borderRadius: 7,
    alignSelf: 'center',
  },
  modalHeader: {
    borderBottomColor: vars.COLOR_MODAL_BORDER,
    borderBottomWidth: 1,
    height: 77,
    padding: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Rubik-Medium',
    fontSize: 15,
    color: vars.COLOR_TEXT_TITLE,
  },
  modalClose: {},
  modalCloseIcon: {
    width: 26,
    height: 26,
  },
  modalBody: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  seedOn: {
    backgroundColor: vars.COLOR_SUCCESS,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 7,
    margin: 5,
  },
  seedTextWhite: {
    fontFamily: 'Rubik-Regular',
    fontSize: 15,
    color: '#ffffff',
  },
  wrpSeed: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  seedOff: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: vars.COLOR_GREY_LIGHT,
    paddingHorizontal: 10,
    paddingVertical: 7,
    margin: 5,
  },
  seedTextGreen: {
    fontFamily: 'Rubik-Regular',
    fontSize: 15,
    color: vars.COLOR_SUCCESS,
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
