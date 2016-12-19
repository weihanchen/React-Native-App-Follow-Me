import React from 'react';
import {
    Navigator,
    View,
    StyleSheet,
    Text,
} from 'react-native';

import Splash from '../components/Splash';

class AppContainer extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>

                <Navigator
                    initialRoute={{ name: 'Splash', component: Splash }}

                    configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromRight;
                    } }
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    } }
                    />
            </View>
        )
    }
}

export default AppContainer;
