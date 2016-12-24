import React from 'react'
import {
    BackAndroid,
    Navigator,
    Platform,
    StyleSheet,
    Text,
    ToastAndroid,
    View
} from 'react-native'

import Splash from '../components/Splash'

class AppContainer extends React.Component {

    constructor(props) {
      super(props)
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this))
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this))
        }
    }
    onBackAndroid = () => {
        const nav = this._navigator
        const routers = nav.getCurrentRoutes()
        if (routers.length > 1) {
            nav.pop();
            return true;
        }
        return false;
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>

                <Navigator initialRoute={{
                    name: 'Splash',
                    component: Splash
                }} configureScene={(route) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }} renderScene={(route, navigator) => {
                    this._navigator = navigator
                    let Component = route.component;
                    return (<Component navigator={navigator} route={route} {...route.passProps} />)
                }} />
            </View>
        )
    }
}

export default AppContainer;
