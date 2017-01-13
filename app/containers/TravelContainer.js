'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, StyleSheet} from 'react-native'
//actions
import {requestFetchGroup} from '../actions'
//components
import {TravelMap} from '../components/Travel'

class TravelContainer extends Component {
   constructor(props) {
      super(props)
   }

   watchID :
      ? number = null

   componentDidMount() {
      const groupId = this.props.groupId
      this.props.requestFetchGroup(groupId)
      this.watchID = navigator.geolocation.watchPosition((position) => {
         let lastPosition = JSON.stringify(position)
         console.log(lastPosition)
      }, (error) => console.log(error), {
         enableHighAccuracy: true,
         timeout: 1000,
         maximumAge: 1000
      })
   }

   componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID)
   }

   render() {
      return (
         <View style={styles.container}>
            <TravelMap></TravelMap>
         </View>
      )
   }
}

const mapStateToProps = (state) => {
    return {group: state.group}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestFetchGroup,
    }, dispatch)
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

TravelContainer.propTypes = {
   groupId: PropTypes.string,
   requestFetchGroup: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelContainer)
