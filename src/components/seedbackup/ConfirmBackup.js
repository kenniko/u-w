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

class ConfirmBackup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionBtnPhrase: this.shuffleArray(this.props.phrase.split(' ')),
      selectedBtnPhrase: [],
      correctPhraseOrder: false,
    };

    this.onRandomPrhaseBtnClick = this.onRandomPrhaseBtnClick.bind(this);
    this.onSelectedPrhaseBtnClick = this.onSelectedPrhaseBtnClick.bind(this);
  }

  shuffleArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  removeThisArrayItem(arr, item) {
    let index = arr.indexOf(item);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  checkPhrase() {
    this.setState(
      {
        correctPhraseOrder:
          this.state.selectedBtnPhrase.join(' ') === this.props.phrase,
      },
      () => this.props.phraseOrder(this.state.correctPhraseOrder),
    );
    console.log(this.state.selectedBtnPhrase.join(' '));
    console.log(this.props.phrase);
  }

  onSelectedPrhaseBtnClick(e) {
    console.log(e);
    this.setState(
      {
        selectedBtnPhrase: this.removeThisArrayItem(
          this.state.selectedBtnPhrase,
          e,
        ),
      },
      () => this.checkPhrase(),
    );
    this.setState({
      selectionBtnPhrase: [...this.state.selectionBtnPhrase, e],
    });
  }

  onRandomPrhaseBtnClick(e) {
    console.log(e);
    this.setState({
      selectionBtnPhrase: this.removeThisArrayItem(
        this.state.selectionBtnPhrase,
        e,
      ),
    });
    this.setState(
      {
        selectedBtnPhrase: [...this.state.selectedBtnPhrase, e],
      },
      () => this.checkPhrase(),
    );
  }

  createSelectedPhraseBtn(selectedBtnPhrase) {
    let btns = [];
    for (let i = 0; i < selectedBtnPhrase.length; i++) {
      btns.push(
        <View style={styles.seedButtonStyle} key={i}>
          <TouchableOpacity
            onPress={() => this.onSelectedPrhaseBtnClick(selectedBtnPhrase[i])}>
            <Text style={styles.seedText}>{selectedBtnPhrase[i]}</Text>
          </TouchableOpacity>
        </View>,
      );
    }
    return btns;
  }

  createRandomPhraseBtn(randomPhraseArr) {
    let btns = [];
    for (let i = 0; i < randomPhraseArr.length; i++) {
      btns.push(
        <View style={styles.seedButtonStyle} key={i}>
          <TouchableOpacity
            onPress={() => this.onRandomPrhaseBtnClick(randomPhraseArr[i])}>
            <Text style={styles.seedText}>{randomPhraseArr[i]}</Text>
          </TouchableOpacity>
        </View>,
      );
    }
    return btns;
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.TitleModalStyle}>
          <Text style={styles.textTitleModal}>Confirm Backup Phrase</Text>
          <Text style={styles.textContentModal}>
            Verify your Backup Seed Phrase or
          </Text>
          <Text style={styles.textContentModal}>
            <TouchableOpacity onPress={() => this.props.confirmPage()}>
              <Text>Go Back</Text>
            </TouchableOpacity>
          </Text>
          <View>
            {this.createSelectedPhraseBtn(this.state.selectedBtnPhrase)}
          </View>
          <Text style={styles.textContentModal}>
            Please, tap each word in the correct order
          </Text>
          <View style={styles.TitleModalStyle}>
            {this.createRandomPhraseBtn(this.state.selectionBtnPhrase)}
          </View>
        </View>
        <View style={styles.buttonStyle}>
          <Button
            title="Confirm"
            disabled={!this.state.correctPhraseOrder}
            onPress={() => this.props._onButtonPress()}
          />
        </View>
      </View>
    );
  }
}

export default ConfirmBackup;

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
  seedText: {
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
