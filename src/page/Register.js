import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const Register = () => (
  <View style={styles.container}>
    <Text>Register page</Text>
    <Button>Register</Button>
    <Button>Back</Button>
  </View>
);

export default Register;
