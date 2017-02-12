'use strict'

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {InteractionManager, Text, View, StyleSheet} from 'react-native'
//actions
import {requestIdentify} from '../actions'
//components
import AddContainer from './AddContainer'
import {MenuBody} from '../components/Menu'
import Splash from '../components/Splash';
import CreateContainer from './CreateContainer'
import TravelContainer from './TravelContainer'

class MenuContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isFirstVisit: true
      }
   }

   componentDidMount() {
      this.props.requestIdentify()
   }

   componentWillUnmount() {}

   componentWillReceiveProps(nextProps) {
      const {navigator} = this.props
      if (this.state.isFirstVisit && nextProps.identify.status === 'request_success' && nextProps.identify.isIdentify) {
         this.setState({isFirstVisit: false})
         InteractionManager.runAfterInteractions(() => {
            navigator.push({
               component: TravelContainer,
               passProps: {
                  groupId: nextProps.identify.groupId,
                  userId: nextProps.identify.userId
               }
            })
         }, 1000)
      }
   }

   navigateToAddToGroup() {
      const {navigator} = this.props
      InteractionManager.runAfterInteractions(() => {
         navigator.push({component: AddContainer})
      }, 1000)
   }

   navigateToCreateGroup() {
      const {navigator} = this.props
      InteractionManager.runAfterInteractions(() => {
         navigator.push({component: CreateContainer})
      }, 1000)
   }

   render() {
      const {identify} = this.props
      return (
         <View style={styles.container}>
            <MenuBody isIdentify={identify.isIdentify} navigateToAddToGroup={this.navigateToAddToGroup.bind(this)} navigateToCreateGroup={this.navigateToCreateGroup.bind(this)}></MenuBody>
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
      requestIdentify
   }, dispatch)
}

MenuContainer.propTypes = {
   navigator: PropTypes.object,
   requestIdentify: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)
