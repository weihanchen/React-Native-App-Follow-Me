'use strict'

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {InteractionManager, Text, View, StyleSheet} from 'react-native'
//actions
import {requestCheckIdentify} from '../actions'
//components
import {MenuBody} from '../components/Menu'
import Splash from '../components/Splash';
import CreateContainer from './CreateContainer'
import TravelContainer from './TravelContainer'

class MenuContainer extends Component {
   constructor(props) {
      super(props);
   }

   componentDidMount() {
      this.props.requestCheckIdentify()

   }

   componentWillReceiveProps(nextProps) {
     const {navigator} = this.props
      if (nextProps.identify.status === 'success') {
        InteractionManager.runAfterInteractions(() => {
           navigator.push({component: TravelContainer, passProps: {
              groupId: nextProps.identify.groupId,
              userId: nextProps.identify.userId
           }})
        }, 100)
      }
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

const mapStateToProps = (state) => {
    return {identify: state.identify}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestCheckIdentify
    }, dispatch)
}

MenuContainer.propTypes = {
   navigator: PropTypes.object,
   requestCheckIdentify: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)
