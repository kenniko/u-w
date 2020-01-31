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
import IconClose from '../icon/IconClose';
import ButtonPrimary from '../../components/ButtonPrimary';
import s from '../../assets/styles/Styles';
import {vars} from '../../assets/styles/Vars';

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
        <TouchableOpacity
          style={s.seedOn}
          key={i}
          activeOpacity={vars.OPACITY_TOUCH}
          onPress={() => this.onSelectedPrhaseBtnClick(selectedBtnPhrase[i])}>
          <Text style={s.seedTextWhite}>{selectedBtnPhrase[i]}</Text>
        </TouchableOpacity>,
      );
    }
    return btns;
  }

  createRandomPhraseBtn(randomPhraseArr) {
    let btns = [];
    for (let i = 0; i < randomPhraseArr.length; i++) {
      btns.push(
        <TouchableOpacity
          style={s.seedOff}
          key={i}
          activeOpacity={vars.OPACITY_TOUCH}
          onPress={() => this.onRandomPrhaseBtnClick(randomPhraseArr[i])}>
          <Text style={s.seedTextGreen}>{randomPhraseArr[i]}</Text>
        </TouchableOpacity>,
      );
    }
    return btns;
  }

  render() {
    return (
      <View style={s.modalContainer}>
        <View style={s.modalHeader}>
          <Text style={s.modalTitle}>BACKUP SEED PHRASE</Text>
          <TouchableOpacity
            style={s.modalClose}
            activeOpacity={vars.OPACITY_TOUCH}
            onPress={() => this.props.toggleModal()}>
            <IconClose style={s.modalCloseIcon} fill={vars.COLOR_GREY} />
          </TouchableOpacity>
        </View>

        <ScrollView style={s.modalBody}>
          <Text style={s.textBodyBlack}>
            Verify your Backup Seed Phrase or{' '}
            <Text
              style={[s.textLink, s.textBold]}
              onPress={() => this.props.confirmPage()}>
              go back
            </Text>
          </Text>
          <View style={[s.boxDash, s.wrpSeed]}>
            {this.createSelectedPhraseBtn(this.state.selectedBtnPhrase)}
          </View>
          <View style={s.wrpSeed}>
            {this.createRandomPhraseBtn(this.state.selectionBtnPhrase)}
          </View>
          <View style={{marginTop: 20, marginBottom: 30}}>
            <ButtonPrimary
              title="Confirmation"
              disabled={!this.state.correctPhraseOrder}
              onPress={() => this.props._onButtonPress()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ConfirmBackup;
