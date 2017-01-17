'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, ToastAndroid, StyleSheet} from 'react-native'
//actions
import {requestFetchGroup, requestFetchTravelMarkers} from '../actions'
//components
import {TravelMap} from '../components/Travel'
//service
import {FirebaseService} from '../api'

const firebaseService = new FirebaseService()

class TravelContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         currentPosition: {

         },
         currentUid: '',
         endPosition: {

         },
         groupId: '',
         leaderId: '',
         memberIdList: []
      }
   }

   watchID :
      ? number = null

   componentDidMount() {
      this.state.currentUid = this.props.userId
      const groupId = this.props.groupId
      this.state.groupId = groupId
      this.props.requestFetchGroup(groupId)
      this.watchID = navigator.geolocation.watchPosition((position) => {
         const coordinate = {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
         }
         firebaseService.updateCoordinate(this.state.groupId, this.state.currentUid, coordinate)
      }, (error) => ToastAndroid.show(error.message, ToastAndroid.SHORT), {
         enableHighAccuracy: true,
         distanceFilter: 5,
         timeout: 100,
         maximumAge: 0
      })
      firebaseService.onGroupChanged(groupId, () => {
        return this.props.requestFetchTravelMarkers(this.state.currentUid, this.state.leaderId, this.state.memberIdList, this.state.endPosition)
      })
      firebaseService.onUserAdded(() => {
        this.props.requestFetchGroup(groupId)
      })
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.group.status != nextProps.group.status && nextProps.group.status === 'request_success') {
         this.state.leaderId = nextProps.group.leader
         this.state.memberIdList = nextProps.group.members
         this.state.endPosition = nextProps.group.endPosition
         this.props.requestFetchTravelMarkers(this.state.currentUid, this.state.leaderId, this.state.memberIdList, this.state.endPosition)
      }
   }

   componentWillUnmount() {
     console.log('unmount')
      navigator.geolocation.clearWatch(this.watchID)
   }

   render() {
      const {travel} = this.props
      return (
         <View style={styles.container}>
            <TravelMap travel={travel}></TravelMap>
         </View>
      )
   }
}

const mapStateToProps = (state) => {
   return {group: state.group, travel: state.travel}
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      requestFetchGroup,
      requestFetchTravelMarkers
   }, dispatch)
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   }
})

TravelContainer.propTypes = {
   group: PropTypes.object,
   groupId: PropTypes.string,
   requestFetchGroup: PropTypes.func,
   requestFetchTravelMarkers: PropTypes.func,
   travel: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelContainer)
