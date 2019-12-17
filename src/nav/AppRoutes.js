import Launch from '../page/Launch';
import Register from '../page/Register';
import Login from '../page/Login';
import Home from '../page/Home';

const AppRoutes = {
  launch: Launch,
  register: Register,
  login: {
    screen: Login,
    headerMode: 'none',
    navigationOptions: {
      headerMode: 'none',
      headershown: false,
    },
  },
  home: Home,
};

export default AppRoutes;
