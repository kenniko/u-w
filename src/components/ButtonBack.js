import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import IconChevronLeft from './icon/IconChevronLeft';

export default class ButtonBack extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.buttonBack}>
        <IconChevronLeft width={50} height={50} fill={'green'} />
        <Text style={styles.buttonBackText}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonBack: {
    // backgroundColor: '#3b90f4',
    // height: 50,
    // borderRadius: 3,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonBackText: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Rubik-Medium',
    // color: 'white',
  },
});
