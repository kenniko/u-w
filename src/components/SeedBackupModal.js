import React, {Component} from 'react';
import Modal from 'modal-enhanced-react-native-web';
import ModalNative from 'react-native-modal';
import ConfirmBackup from './seedbackup/ConfirmBackup';
import ShowSeed from './seedbackup/ShowSeed';
import {View, Platform} from 'react-native';

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
      <View>
        {Platform.OS === 'ios' || Platform.OS === 'android' ? (
          <ModalNative
            // presentationStyle="overFullScreen"
            isVisible={this.props.isVisible}>
            {this.state.isConfirmPage ? (
              <ConfirmBackup confirmPage={this.confirmPage} {...this.props} />
            ) : (
              <ShowSeed confirmPage={this.confirmPage} {...this.props} />
            )}
          </ModalNative>
        ) : (
          <Modal
            // presentationStyle="overFullScreen"
            isVisible={this.props.isVisible}>
            {this.state.isConfirmPage ? (
              <ConfirmBackup confirmPage={this.confirmPage} {...this.props} />
            ) : (
              <ShowSeed confirmPage={this.confirmPage} {...this.props} />
            )}
          </Modal>
        )}
      </View>
    );
  }
}

export default SeedBackupModal;
