'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {InteractionManager, StyleSheet, Text, ToastAndroid, View} from 'react-native'
//components
import {AddBody} from '../components/Add'
import TravelContainer from './TravelContainer'
//actions
import {requestAddToGroup, requestCheckIdentify} from '../actions'

class AddContainer extends Component {
   constructor(props) {
      super(props)
   }

   componentWillReceiveProps(nextProps) {
      const groupStatusFunc = {
         add_success: () => {
           const {requestCheckIdentify} = nextProps
           requestCheckIdentify()
         },
         error: (group) => ToastAndroid.show(group.error, ToastAndroid.SHORT)
      }
      const identifyStatusFunc = {
         success: () => {
           const {navigator} = nextProps
           InteractionManager.runAfterInteractions(() => {
              navigator.push({component: TravelContainer, passProps: {
                 groupId: nextProps.identify.groupId,
                 userId: nextProps.identify.userId
              }})
           })
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
      requestCheckIdentify
   }, dispatch)
}

AddContainer.propTypes = {
   group: PropTypes.object,
   identify: PropTypes.object,
   requestAddToGroup: PropTypes.func,
   requestCheckIdentify: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContainer)
