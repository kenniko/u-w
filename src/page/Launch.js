import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '../components/Spinner';
import {NavigationActions, StackActions} from 'react-navigation';
import * as storage from '../storage/storage';

class Launch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    let me = this;
    storage.getLoginData(function(wallet) {
      if (wallet == null) {
        me.setState({isLoading: false}, () => {
          me.redirectTo('login');
        });
      } else {
        me.setState({isLoading: false}, () => {
          me.redirectTo('home');
        });
      }
    });
  }

  redirectTo(page, params) {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: page,
            params: params,
          }),
        ],
      }),
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Spinner visible={this.state.isLoading} />
      </View>
    );
  }
}

function mapStateToProps({loginReducer}) {
  const {error, wallet} = loginReducer;
  return {error, wallet};
}

export default connect(
  mapStateToProps,
  {},
)(Launch);

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    flex: 1,
  },
};
