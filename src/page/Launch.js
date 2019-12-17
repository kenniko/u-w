import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import storage from '../storage';
import {Spinner} from '../components/Spinner';
import {NavigationActions, StackActions} from 'react-navigation';

class Launch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLogged: false,
    };
  }

  componentDidMount() {
    storage
      .load({
        key: 'wallet',
        autoSync: true,
        syncInBackground: true,
      })
      .then(wallet => {
        this.setState({isLoading: false}, () => {
          this.redirectTo('home');
        });
      })
      .catch(_err => {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            this.redirectTo('login');
          },
        );
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
