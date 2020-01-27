import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import IconChevronLeft from './icon/IconChevronLeft';

export default class ButtonBack extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.buttonBack}>
        <IconChevronLeft style={styles.buttonBackIcon} fill={'#2e384d'} />
        <Text style={styles.buttonBackText}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonBack: {
    padding: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
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
    fontFamily: 'Rubik-Regular',
    color: '#2e384d',
  },
});
