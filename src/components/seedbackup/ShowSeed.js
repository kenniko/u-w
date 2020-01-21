import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  TouchableHighlight,
} from 'react-native';

class ShowSeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.TitleModalStyle}>
          <Text style={styles.textTitleModal}>Backup Seed Phrase</Text>
          <Text style={styles.textContentModal}>
            Treat your Backup Seed Phrase with care!
          </Text>
          <Text style={styles.textContentModal}>
            Only Backup Seed Phrase can provide access to your wallet. Don 't
            put your Backup Seed Phrase anywhere except official Unity clients
            (look at the site domain). If someone else accesses it you will lose
            your funds. Store your Backup Seed Phrase safely, it is the only way
            to restore your wallet.
          </Text>
          <Text style={styles.textContentModal}>
            Copy and save this Backup Seed Phrase :
          </Text>
          <View style={styles.seedViewStyle}>
            <TouchableOpacity
              onPress={() => Clipboard.setString(this.props.phrase)}>
              <Text style={styles.seedTextModal}>{this.props.phrase}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonStyle}>
          <Button
            title="I have saved this backup phrase"
            onPress={() => this.props.confirmPage()}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button title="Close" onPress={() => this.props.toggleModal()} />
        </View>
      </View>
    );
  }
}

export default ShowSeed;

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    flex: 1,
  },
  TitleModalStyle: {
    marginTop: 35,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  seedViewStyle: {
    marginTop: 35,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    paddingTop: 15,
    backgroundColor: '#d8d8d8',
    alignItems: 'center',
    textAlign: 'center',
  },
  textTitleModal: {
    color: '#7d62d9',
    fontSize: 20,
    fontWeight: '500',
    alignItems: 'center',
    textAlign: 'center',
  },
  textContentModal: {
    color: '#8e8e8e',
    fontSize: 15,
    fontWeight: '500',
    alignItems: 'center',
    textAlign: 'center',
  },
  seedTextModal: {
    color: '#003333',
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonStyle: {
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 50,
  },
};
