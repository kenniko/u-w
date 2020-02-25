import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {vars} from '../assets/styles/Vars';

export default class ButtonPrimary extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.buttonPrimary = React.createRef();
  // }
  // // buttonPrimary = React.createRef();

  // componentDidMount() {
  //   this.buttonPrimary.current.setNativeProps({cclass: 'buttonPrimary'});
  // }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.buttonPrimary,
          this.props.disabled ? {opacity: 0.5} : null,
        ]}
        activeOpacity={vars.OPACITY_TOUCH}
        // ref={this.buttonPrimary}
        disabled={this.props.disabled}>
        <Text style={styles.buttonPrimaryText}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: 'black',
    // backgroundColor: vars.COLOR_PRIMARY,
    height: 50,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    marginVertical: vars.GAP_BUTTON,
  },
  buttonPrimaryText: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Rubik-Medium',
    fontWeight: '500',
    color: 'white',
  },
});
