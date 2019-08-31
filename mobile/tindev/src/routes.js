import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import Login from './pages/login'
import Main from './pages/Main'


const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
    })
);


export default Routes;