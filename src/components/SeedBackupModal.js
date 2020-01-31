import React, {Component} from 'react';
import Modal from 'modal-enhanced-react-native-web';
import ConfirmBackup from './seedbackup/ConfirmBackup';
import ShowSeed from './seedbackup/ShowSeed';

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
      <Modal
        // presentationStyle="overFullScreen"
        isVisible={this.props.isVisible}>
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
