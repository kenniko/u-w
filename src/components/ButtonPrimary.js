import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class ButtonPrimary extends React.Component {
  constructor(props) {
    super(props);
    this.buttonPrimary = React.createRef();
  }
  // buttonPrimary = React.createRef();

  componentDidMount() {
    this.buttonPrimary.current.setNativeProps({cclass: 'buttonPrimary'});
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.buttonPrimary}
        ref={this.buttonPrimary}
        disabled={this.props.disabled}>
        <Text ref={this.buttonPrimaryText} style={styles.buttonPrimaryText}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: '#3b90f4',
    height: 50,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimaryText: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Rubik-Medium',
    color: 'white',
  },
});
