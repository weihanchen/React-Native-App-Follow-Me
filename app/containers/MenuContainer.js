'use strict'

import React, {Component, PropTypes} from 'react'
import {InteractionManager, Text, View, StyleSheet} from 'react-native'

//components
import {MenuBody} from '../components/Menu'
import Splash from '../components/Splash';
import CreateContainer from './CreateContainer'

class MenuContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    navigateToCreateGroup() {
        const {navigator} = this.props
        InteractionManager.runAfterInteractions(() => {
            navigator.push({component: CreateContainer})
        }, 1000)
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

MenuContainer.propTypes = {
  navigator: PropTypes.object
}

export default MenuContainer
