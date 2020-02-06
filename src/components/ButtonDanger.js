import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {vars} from '../assets/styles/Vars';

export default class ButtonDanger extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.buttonDanger,
          this.props.disabled ? {opacity: 0.5} : null,
        ]}
        activeOpacity={vars.OPACITY_TOUCH}
        disabled={this.props.disabled}>
        <Text style={styles.buttonDangerText}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonDanger: {
    backgroundColor: vars.COLOR_DANGER_LIGHT,
    height: 50,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    marginVertical: vars.GAP_BUTTON,
  },
  buttonDangerText: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Rubik-Medium',
    fontWeight: '500',
    color: vars.COLOR_DANGER,
  },
});
