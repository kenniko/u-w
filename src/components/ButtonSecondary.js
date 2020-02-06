import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {vars} from '../assets/styles/Vars';

export default class ButtonSecondary extends React.Component {
  // constructor() {
  //   super();

  //   /**
  //    * Returns true if the screen is in portrait mode
  //    */
  //   const isPortrait = () => {
  //     const dim = Dimensions.get('screen');
  //     return dim.height >= dim.width;
  //   };

  //   this.state = {
  //     orientation: isPortrait() ? 'portrait' : 'landscape',
  //   };

  //   // Event Listener for orientation changes
  //   Dimensions.addEventListener('change', () => {
  //     this.setState({
  //       orientation: isPortrait() ? 'portrait' : 'landscape',
  //     });
  //   });
  // }

  render() {
    // if (this.state.orientation === 'portrait') {
    //   return (
    //     <TouchableOpacity style={styles.buttonSecondary}>
    //       <Text style={styles.buttonSecondaryText}>{this.props.title}</Text>
    //     </TouchableOpacity>
    //   );
    // } else {
    //   return (
    //     <TouchableOpacity style={styles.buttonSecondaryRed}>
    //       <Text style={styles.buttonSecondaryText}>{this.props.title}</Text>
    //     </TouchableOpacity>
    //   );
    // }
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.buttonSecondary, this.props.disabled && {opacity: 0.5}]}
        activeOpacity={vars.OPACITY_TOUCH}
        disabled={this.props.disabled}>
        <Text style={styles.buttonSecondaryText}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonSecondary: {
    backgroundColor: vars.COLOR_SECONDARY,
    height: 50,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    marginVertical: vars.GAP_BUTTON,
  },
  buttonSecondaryRed: {
    backgroundColor: 'red',
    height: 50,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryText: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Rubik-Medium',
    fontWeight: '500',
    color: '#3b90f4',
  },
});
