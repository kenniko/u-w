import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import s from '../assets/styles/Styles';
import {vars} from '../assets/styles/Vars';

class Spinner extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.containerOverlay,
          !this.props.visible ? s.isHide : null,
        ]}>
        <ActivityIndicator size="large" color={vars.COLOR_PRIMARY} />
        <Text style={styles.spinnerText}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerOverlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  },
  spinnerText: {
    color: vars.COLOR_PRIMARY,
    marginTop: 12,
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
  },
});

export {Spinner};
