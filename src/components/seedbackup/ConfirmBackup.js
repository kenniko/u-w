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
    };

    this.onRandomPrhaseBtnClick = this.onRandomPrhaseBtnClick.bind(this);
    this.onSelectedPrhaseBtnClick = this.onSelectedPrhaseBtnClick.bind(this);
  }

  componentDidUpdate() {
    if (this.state.selectedBtnPhrase.join(' ') === this.props.phrase) {
      console.log(this.props.phrase);
    } else {
      console.log(this.state.selectedBtnPhrase);
    }
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

  onSelectedPrhaseBtnClick(e) {
    this.setState({
      selectedBtnPhrase: this.removeThisArrayItem(
        this.state.selectedBtnPhrase,
        e.target.dataset.word,
      ),
    });
    this.setState({
      selectionBtnPhrase: [
        ...this.state.selectionBtnPhrase,
        e.target.dataset.word,
      ],
    });
  }

  onRandomPrhaseBtnClick(e) {
    this.setState({
      selectionBtnPhrase: this.removeThisArrayItem(
        this.state.selectionBtnPhrase,
        e.target.dataset.word,
      ),
    });
    this.setState({
      selectedBtnPhrase: [
        ...this.state.selectedBtnPhrase,
        e.target.dataset.word,
      ],
    });
  }

  createSelectedPhraseBtn(selectedBtnPhrase) {
    let btns = [];
    for (let i = 0; i < selectedBtnPhrase.length; i++) {
      btns.push(
        <Button
          onPress={() => this.onSelectedPrhaseBtnClick}
          title={selectedBtnPhrase[i]}
          key={i}
        />,
      );
    }
    return btns;
  }

  createRandomPhraseBtn(randomPhraseArr) {
    let btns = [];
    for (let i = 0; i < randomPhraseArr.length; i++) {
      btns.push(
        <Button
          title={randomPhraseArr[i]}
          key={i}
          onPress={() => this.onRandomPrhaseBtnClick}
        />,
      );
    }
    return btns;
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.textContentModal}>Confirm Backup Phrase</Text>
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
        <View>{this.createRandomPhraseBtn(this.state.selectionBtnPhrase)}</View>
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
    alignItems: 'left',
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
    alignItems: 'left',
    textAlign: 'left',
  },
  textContentModal: {
    color: '#8e8e8e',
    fontSize: 15,
    fontWeight: '500',
    alignItems: 'left',
    textAlign: 'left',
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
