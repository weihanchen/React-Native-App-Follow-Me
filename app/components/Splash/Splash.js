'use strict'

import React from 'react'
import {Dimensions, Image, InteractionManager, View, Text} from 'react-native'

import * as Animatable from 'react-native-animatable'
import MenuContainer from '../../containers/MenuContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import MainStyle from '../../stylesheets'

class Splash extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const {navigator} = this.props;
        this.timer = setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                navigator.resetTo({component: MenuContainer, name: 'MenuContainer'});
            });
        }, 2000);
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        return (
            <View style={styles.container}>
                <Animatable.View style={styles.logoView} animation="fadeInUp" delay={500} duration={1500} easing="ease-out">
                    <Icon name="location-arrow" size={30} color={MainStyle.color.lightblue} />
                    <Text style={styles.logoText}>Follow Me</Text>
                </Animatable.View>
            </View>
        )
    }
}
export default Splash;
