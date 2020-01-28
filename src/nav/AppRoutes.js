import Launch from '../page/Launch';
import Register from '../page/Register';
import Login from '../page/Login';
import Home from '../page/Home';
import Welcome from '../page/Welcome';
import Import from '../page/Import';

const AppRoutes = {
  launch: Launch,
  create: Register,
  signin: Login,
  //   screen: Login,
  //   headerMode: 'none',
  //   navigationOptions: {
  //     headerMode: 'none',
  //     headershown: false,
  //   },
  // },
  home: Home,
  welcome: Welcome,
  import: Import,
};

export default AppRoutes;
