import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import IconChevronLeft from './icon/IconChevronLeft';
import s from '../assets/styles/Styles';
import {vars} from '../assets/styles/Vars';

export default class ButtonBack extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        activeOpacity={vars.OPACITY_TOUCH}
        style={[
          styles.buttonBack,
          this.props.hide ? s.isHide : null,
          this.props.disabled ? {opacity: 0.5} : null,
        ]}
        disabled={this.props.disabled}>
        <IconChevronLeft
          style={styles.buttonBackIcon}
          fill={this.props.color}
        />
        <Text
          style={[
            styles.buttonBackText,
            {color: this.props.color ? this.props.color : 'black'},
          ]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonBack: {
    paddingVertical: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    // backgroundColor: 'rgba(255,255,255,0.9)',
    // shadowColor: '#ffffff',
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 0.9,
    // shadowRadius: 20,
    // position: 'absolute',
    // top: 20,
    // left: 6,
  },
  buttonBackIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  buttonBackText: {
    fontSize: 15,
    lineHeight: 18,
    marginTop: 0.5,
    fontFamily: 'Rubik-Regular',
  },
});
