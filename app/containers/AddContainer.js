'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {InteractionManager, StyleSheet, Text, ToastAndroid, View} from 'react-native'
//components
import {AddBody} from '../components/Add'
import MenuContainer from './MenuContainer'
import TravelContainer from './TravelContainer'
//actions
import {requestAddToGroup, requestIdentify} from '../actions'

class AddContainer extends Component {
   constructor(props) {
      super(props)
   }

   componentWillReceiveProps(nextProps) {
      const groupStatusFunc = {
         add_success: () => this.props.requestIdentify(),
         error: (group) => ToastAndroid.show(group.error, ToastAndroid.SHORT)
      }

      const identifyStatusFunc = {
         request_success: (identify) => {
            const {navigator} = nextProps
            InteractionManager.runAfterInteractions(() => {
               navigator.replace({
                  component: TravelContainer,
                  passProps: {
                     groupId: identify.groupId,
                     userId: identify.userId
                  }
               })
            }, 1000)
         },
         error: (identify) => ToastAndroid.show(identify.error, ToastAndroid.SHORT)
      }

      if (groupStatusFunc.hasOwnProperty(nextProps.group.status) && nextProps.group.status != this.props.group.status)
         groupStatusFunc[nextProps.group.status](nextProps.group)

      if (identifyStatusFunc.hasOwnProperty(nextProps.identify.status) && nextProps.identify.status != this.props.identify.status)
         identifyStatusFunc[nextProps.identify.status](nextProps.identify)
   }

   handleAddToGroup(groupName, userName) {
      this.props.requestAddToGroup(groupName, userName)
   }

   render() {
      const {group} = this.props
      return (
         <AddBody group={group} handleAddToGroup={this.handleAddToGroup.bind(this)}></AddBody>
      )
   }
}

const mapStateToProps = (state) => {
   return {group: state.group, identify: state.identify}
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      requestAddToGroup,
      requestIdentify
   }, dispatch)
}

AddContainer.propTypes = {
   group: PropTypes.object,
   identify: PropTypes.object,
   requestAddToGroup: PropTypes.func,
   requestIdentify: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContainer)
