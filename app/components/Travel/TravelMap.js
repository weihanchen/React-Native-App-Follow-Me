'use strict'
import React, {
   Component,
   PropTypes
} from 'react'
//plugins
import {
  Dimensions,
  Text,
  View
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Icon from 'react-native-vector-icons/FontAwesome'
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
        end: {
          key: '終點',
          coordinate: {
            latitude: 23.606352,
            longitude: 120.456137
          }
        },
        members: [
          {
            key: 'andy',
            coordinate: {
              latitude: 23.6010548,
              longitude: 120.4536408
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
        },
        self: {
          key: '暐翰',
          coordinate: {
            latitude: 23.599505,
            longitude: 120.453994
          }
        }
      }
   }

   render() {
      return (
        <MapView style={styles.container} region={this.state.region} onRegionChange={(region) => this.setState({region})}>
          <Marker {...this.state.self}>
            <View style={styles.member}>
              <Icon name='user' style={styles.selfText}/>
              <Text style={styles.selfText}>{this.state.self.key}</Text>
            </View>
          </Marker>
          <Marker {...this.state.end}>
            <View style={styles.end}>
              <Icon name='flag' style={styles.endText}/>
              <Text style={styles.endText}>{this.state.end.key}</Text>
            </View>
          </Marker>
          {this.state.members.map(member => (
            <Marker {...member}>
              <View style={styles.member}>
                <Icon name='user' style={styles.memberText}/>
                <Text style={styles.memberText}>{member.key}</Text>
              </View>
            </Marker>
          ))}
        </MapView>
      )
   }
}

export default TravelMap
