import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';

export default class ButtonSecondary extends React.Component {
  constructor() {
    super();

    /**
     * Returns true if the screen is in portrait mode
     */
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }

  render() {
    if (this.state.orientation === 'portrait') {
      return (
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonSecondaryText}>{this.props.title}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.buttonSecondaryRed}>
          <Text style={styles.buttonSecondaryText}>{this.props.title}</Text>
        </TouchableOpacity>
      );
    }
    // return (
    //   <TouchableOpacity style={styles.buttonSecondary}>
    //     <Text style={styles.buttonSecondaryText}>{this.props.title}</Text>
    //   </TouchableOpacity>
    // );
  }
}

const styles = StyleSheet.create({
  buttonSecondary: {
    backgroundColor: '#D7E9FD',
    height: 50,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#3b90f4',
  },
});
