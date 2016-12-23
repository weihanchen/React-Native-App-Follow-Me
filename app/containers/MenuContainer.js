'use strict'

import React, {Component} from 'react'
import {View, Text, InteractionManager,StyleSheet} from 'react-native'

//components
import {MenuBody} from '../components/Menu'
import Splash from '../components/Splash';
import CreateContainer from './CreateContainer'

class MenuContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}
    componentWillUnmount() {}

    navigateToCreateGroup() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.resetTo({ name: 'CreateContainer', component: CreateContainer });
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <MenuBody navigateToCreateGroup={this.navigateToCreateGroup.bind(this)}></MenuBody>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default MenuContainer
