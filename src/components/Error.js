/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Button,
} from 'react-native';

const {height: deviceHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: new Animated.Value(-deviceHeight),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: 0,
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {backgroundColor: 'rgba(52,52,52,0.5)'},
          {transform: [{translateY: this.state.offset}]},
        ]}>
        <View
          style={{
            width: 250,
            height: 250,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Text>{this.props.error}</Text>
          <Button title="Close" />
        </View>
      </Animated.View>
    );
  }
}
