import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        //Página principal (map dev)
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'
            },
        },
        //página do github
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github'
            },
        },
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#FFF', //Cor do texto da header
            headerStyle: { //Container Header
                backgroundColor: '#7D40E7', //Cor do fundo do header

            }
        }
    })
);

export default Routes;