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
import Modal from 'modal-enhanced-react-native-web';
import ConfirmBackup from './seedbackup/ConfirmBackup';
import ShowSeed from './seedbackup/ShowSeed';
import {Spinner} from './Spinner';

class SeedBackupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      isConfirmPage: false,
    };
  }

  confirmPage = () => {
    this.setState({isConfirmPage: !this.state.isConfirmPage});
  };

  render() {
    return (
      <Modal isVisible={this.props.isVisible}>
        <Spinner visible={this.props.isLoading} />
        {this.state.isConfirmPage && (
          <ConfirmBackup confirmPage={this.confirmPage} {...this.props} />
        )}
        {!this.state.isConfirmPage && (
          <ShowSeed confirmPage={this.confirmPage} {...this.props} />
        )}
      </Modal>
    );
  }
}

export default SeedBackupModal;
