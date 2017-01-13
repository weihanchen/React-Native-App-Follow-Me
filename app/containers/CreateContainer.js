'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {InteractionManager, View, Text, StyleSheet} from 'react-native'
//actions
import {requestCheckIdentify, requestCreateGroup, requestGeolocation, requestGeocoding} from '../actions'
//components
import {CreateBody} from '../components/Create/index.js'
import TravelContainer from './TravelContainer'

class CreateContainer extends Component {
   constructor(props) {
      super(props)
   }

   componentDidMount() {
      this.props.requestGeolocation()
   }

   componentWillReceiveProps(nextProps) {
      const {navigator} = this.props
      if (nextProps.identify.status === 'success') {
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

   handleCreateGroup(groupName, username, expiredTime, startPosition, endPosition) {
      this.props.requestCreateGroup(groupName, username, expiredTime, startPosition, endPosition)
   }

   handleCheckIdentify() {
      this.props.requestCheckIdentify();
   }

   handleSearchAddress(address) {
      this.props.requestGeocoding(address)
   }

   render() {
      const {location, geocoding, group} = this.props
      return (
         <View style={styles.container}>
            <CreateBody location={location} geocoding={geocoding} group={group} handleCheckIdentify={this.handleCheckIdentify.bind(this)} handleSearchAddress={this.handleSearchAddress.bind(this)} handleCreateGroup={this.handleCreateGroup.bind(this)}></CreateBody>
         </View>
      )
   }
}

const mapStateToProps = (state) => {
   return {location: state.location, geocoding: state.geocoding, group: state.group, identify: state.identify}
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      requestCheckIdentify,
      requestCreateGroup,
      requestGeocoding,
      requestGeolocation
   }, dispatch)
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   }
})

CreateContainer.propTypes = {
   geocoding: PropTypes.object,
   group: PropTypes.object,
   identify: PropTypes.object,
   location: PropTypes.object,
   requestCheckIdentify: PropTypes.func,
   requestCreateGroup: PropTypes.func,
   requestGeocoding: PropTypes.func,
   requestGeolocation: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
