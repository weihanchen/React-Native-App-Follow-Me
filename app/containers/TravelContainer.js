'use strict'
import React, {
   Component,
   PropTypes
} from 'react'
import {
   connect
} from 'react-redux'
import {
   bindActionCreators
} from 'redux'
import {
   View,
   Text,
   StyleSheet
} from 'react-native'

class TravelContainer extends Component {
   constructor(props) {
      super(props)
   }

   render() {
     return (
       <View>
        <Text>TravelContainer</Text>
       </View>
     )
   }
}


export default TravelContainer
