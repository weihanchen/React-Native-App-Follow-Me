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
import {requestAddToGroup, requestCheckIdentify} from '../actions'

class AddContainer extends Component {
   constructor(props) {
      super(props)
   }

   componentWillReceiveProps(nextProps) {
      const groupStatusFunc = {
         add_success: () => {
           const {navigator} = nextProps
           InteractionManager.runAfterInteractions(() => {
              this.props.requestCheckIdentify()
           })
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
