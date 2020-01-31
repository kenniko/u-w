import React, {Component} from 'react';
import {
  Dimensions,
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
import {isScreenDesktop} from '../../actions/mediaQuery';

class ShowSeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      isScreenDesktop: isScreenDesktop(),
    };

    Dimensions.addEventListener('change', () => {
      this.setState({
        isScreenDesktop: isScreenDesktop(),
      });
    });
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
            Only Backup Seed Phrase can provide access to your wallet.
          </Text>
          <Text style={s.textBody}>
            Don 't put your Backup Seed Phrase anywhere except official Unity
            clients (look at the site domain). If someone else accesses it you
            will lose your funds.
          </Text>
          <Text style={s.textBody}>
            Store your Backup Seed Phrase safely, it is the only way to restore
            your wallet.
          </Text>
          <Text style={s.textBodyBlack}>
            <Text
              style={[s.textLink, s.textBold]}
              onPress={() => Clipboard.setString(this.props.phrase)}>
              Copy
            </Text>{' '}
            and save this Backup Seed Phrase
          </Text>
          <View style={s.boxDash}>
            <Text style={s.textBodyBlack}>{this.props.phrase}</Text>
          </View>
          <View style={{marginTop: 20, marginBottom: 30}}>
            <ButtonPrimary
              title="I Have Saved This Backup Phrase"
              onPress={() => this.props.confirmPage()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ShowSeed;
