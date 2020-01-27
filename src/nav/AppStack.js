import {createStackNavigator} from 'react-navigation-stack';
import AppRoutes from './AppRoutes';
import AppOptions from './AppOptions';

const AppStack = createStackNavigator(AppRoutes, AppOptions);

export default AppStack;
