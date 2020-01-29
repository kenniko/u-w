import React from 'react';
import {View, Image, Linking, Text, StyleSheet} from 'react-native';
import ButtonBack from './ButtonBack';
import {vars} from '../assets/styles/Vars';
import LinearGradient from 'react-native-web-linear-gradient';

export default class HeroDesktop extends React.Component {
  render() {
    return (
      <View style={styles.homeHero}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={require('../assets/img/bg-home-low.jpg')}
        />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0, 1]}
          colors={[vars.COLOR_GRADIENT_PRIMARY, vars.COLOR_GRADIENT_SECONDARY]}
          useAngle={true}
          angle={45}
          angleCenter={{x: 0, y: 0}}
          style={styles.heroOverlay}>
          <View style={styles.buttonBack}>
            <ButtonBack
              title="Back to Home"
              color="#ffffff"
              onPress={() => Linking.openURL('https://www.unity.sg/')}
            />
          </View>
          <View style={{paddingHorizontal: 75, width: '100%'}}>
            <Image
              style={{width: 'auto', height: 103}}
              resizeMode={'contain'}
              source={require('../assets/img/unity-logo-white.png')}
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.linkWrapper}>
              <Text
                style={styles.textLink}
                onPress={() => Linking.openURL('https://www.unity.sg/')}>
                Terms Of Service
              </Text>
              <Text style={[styles.textLink, styles.textSeparator]}>|</Text>
              <Text
                style={styles.textLink}
                onPress={() => Linking.openURL('https://www.unity.sg/')}>
                Privacy Policy
              </Text>
            </View>
            <Text style={styles.copyright}>©2019 Unity Coin Pte. Ltd.</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeHero: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: vars.WIDTH_HOME_SIDEBAR,
    zIndex: 9,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBack: {
    position: 'absolute',
    top: 50,
    left: 70,
    zIndex: 9,
  },
  footer: {
    position: 'absolute',
    zIndex: 9,
    left: 70,
    right: 70,
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  linkWrapper: {
    marginTop: 6,
    flexDirection: 'row',
  },
  textLink: {
    fontFamily: 'Rubik-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: '#fff',
  },
  textSeparator: {
    marginHorizontal: 10,
  },
  copyright: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Rubik-Regular',
    color: '#ffffff',
  },
});
