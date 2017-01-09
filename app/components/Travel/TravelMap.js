'use strict'
import React, {
   Component,
   PropTypes
} from 'react'
//plugins
import {
  Dimensions
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
//stylesheets
import styles from './styles'
const screen = Dimensions.get('window')
const ASPECT_RATIO = screen.width / screen.height
const LATITUDE = 23.6010548
const LONGITUDE = 120.4536408
const LATITUDE_DELTA = 0.0122
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class TravelMap extends Component {
   constructor(props) {
      super(props)
      this.state = {
        members: [
          {
            key: 'andy',
            coordinate: {
              latitude: 23.6010548,
              longitude: 120.4536355
            }
          },
          {
            key: 'tina',
            coordinate: {
              latitude: 23.602298,
              longitude: 120.451112
            }
          }
        ],
        region: {
           latitude: LATITUDE,
           longitude: LONGITUDE,
           latitudeDelta: LATITUDE_DELTA,
           longitudeDelta: LONGITUDE_DELTA
        }
      }
   }

   render() {
      return (
        <MapView style={styles.container} region={this.state.region} onRegionChange={(region) => this.setState({region})}>
          {this.state.members.map(member => <Marker {...member}/>)}
        </MapView>
      )
   }
}

export default TravelMap
