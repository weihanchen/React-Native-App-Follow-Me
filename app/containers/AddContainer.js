'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {InteractionManager, StyleSheet, Text, ToastAndroid, View} from 'react-native'
//components
import {AddBody} from '../components/Add'
import MenuContainer from './MenuContainer'
//actions
import {requestAddToGroup} from '../actions'

class AddContainer extends Component {
   constructor(props) {
      super(props)
   }

   componentWillReceiveProps(nextProps) {
      const groupStatusFunc = {
         add_success: () => {
            const {navigator} = this.props
            InteractionManager.runAfterInteractions(() => {
               navigator.push({component: MenuContainer})
            }, 1000)
         },
         error: (group) => ToastAndroid.show(group.error, ToastAndroid.SHORT)
      }
      if (groupStatusFunc.hasOwnProperty(nextProps.group.status) && nextProps.group.status != this.props.group.status)
         groupStatusFunc[nextProps.group.status](nextProps.group)
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
   return {group: state.group}
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      requestAddToGroup
   }, dispatch)
}

AddContainer.propTypes = {
   group: PropTypes.object,
   requestAddToGroup: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContainer)
