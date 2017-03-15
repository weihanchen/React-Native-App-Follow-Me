'use strict'
import React, { Component, PropTypes } from 'react'
//plugins
import {
   Animated,
   Dimensions,
   Easing,
   Image,
   Text,
   TextInput,
   TouchableOpacity,
   View
} from 'react-native'
import { Button, Icon } from 'react-native-elements'
import MapView, { Callout, Marker, Polyline } from 'react-native-maps'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import * as Animatable from 'react-native-animatable'
//stylesheets
import styles from './styles'
import mainStyle from '../../stylesheets'
const screen = Dimensions.get('window')
const ASPECT_RATIO = screen.width / screen.height
const LATITUDE_DELTA = 0.0122
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class TravelMap extends Component {
   constructor(props) {
      super(props)
      this.state = {
         region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
         }
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.travel.status === 'update_region') {
         const region = Object.assign({}, this.state.region, nextProps.travel.region)
         this.setState({ region })
      }
   }

   onChangeMode(mode) {
      this.props.handleChangeMode(mode)
   }

   onLocated() {
      this.props.handleRequestRegion()
   }

   onRequestToggleAlerting(isAlerting) {
      this.props.handleRequestToggleAlerting(isAlerting)
   }

   onRequestDirection() {
      this.props.handleRequestDirection()
   }

   onToggleSideMenu() {
      this.props.handleToggleSideMenu()
   }

   render() {
      const { travel } = this.props
      const { isAlerting } = travel
      return (
            <View style={styles.container}>
               <MapView style={styles.map} region={this.state.region} onRegionChange={(region) => this.setState({ region })}>
                  <Polyline coordinates={travel.directions} strokeWidth={3} strokeColor={mainStyle.color.navy}></Polyline>
                  {travel.markers.map(marker => _markerSection(marker, this.forceUpdate.bind(this)))}
               </MapView>
               <View style={styles.topContainer}>
                  <TouchableOpacity activeOpacity={0.6} onPress={this.onToggleSideMenu.bind(this)}>
                     <Icon name="bars" reverse color={mainStyle.color.skyblue} type="font-awesome"></Icon>
                  </TouchableOpacity>
                  <View style={styles.modeContainer}>
                     <TouchableOpacity style={_getModeStyle(travel.mode, 'driving')} activeOpacity={0.6} onPress={this.onChangeMode.bind(this, 'driving')}>
                        <FontAwesomeIcon name="car" style={styles.modeButtonIcon}></FontAwesomeIcon>
                     </TouchableOpacity>
                     <TouchableOpacity style={_getModeStyle(travel.mode, 'bicycling')} activeOpacity={0.6} onPress={this.onChangeMode.bind(this, 'bicycling')}>
                        <FontAwesomeIcon name="bicycle" style={styles.modeButtonIcon}></FontAwesomeIcon>
                     </TouchableOpacity>
                     <TouchableOpacity style={_getModeStyle(travel.mode, 'walking')} activeOpacity={0.6} onPress={this.onChangeMode.bind(this, 'walking')}>
                        <FontAwesomeIcon name="male" style={styles.modeButtonIcon}></FontAwesomeIcon>
                     </TouchableOpacity>
                  </View>
               </View>
               <View style={styles.bottomContainer}>
                  <View style={styles.toolContainer}>
                     <TouchableOpacity activeOpacity={0.6} onPress={this.onRequestToggleAlerting.bind(this, travel.isAlerting)}>
                        {_getAlertIconBtn(isAlerting)}
                     </TouchableOpacity>
                     <TouchableOpacity activeOpacity={0.6} onPress={this.onRequestDirection.bind(this)}>
                        <Icon raised name="location-arrow" color={mainStyle.color.navy} type="font-awesome"></Icon>
                     </TouchableOpacity>
                     <TouchableOpacity activeOpacity={0.6} onPress={this.onLocated.bind(this)}>
                        <Icon raised name="arrows" color={mainStyle.color.navy} type="font-awesome"></Icon>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         )
   }
}

//private methods
const _getAlertIconBtn = (isAlerting) => isAlerting ? <Icon raised name="bell" containerStyle={{ backgroundColor: mainStyle.color.warning }} color={mainStyle.color.white} type="font-awesome" />
   : <Icon raised name="bell" color={mainStyle.color.warning} type="font-awesome" />

const _getModeStyle = (activeMode, currentMode) => {
   const results = [styles.modeButton]
   if (activeMode === currentMode)
      results.push(styles.modeButtonActive)
   return results
}

const _markerSection = (marker, forceUpdate) => {
   const renderType = {
      self: () => (
         <View style={styles.member}>
            <View style={styles.selfView}>
               <FontAwesomeIcon name='circle' style={styles.selfText} />
            </View>
         </View>
      ),
      member: () => {
         let imageElement = (
            <Image source={{
               uri: marker.imageUrl
            }} style={styles.memberImage} onLoad={() =>  forceUpdate()}></Image>
         )
         if (!marker.imageUrl) {
            imageElement = (<Image source={require('../../img/default.jpg')} style={styles.memberImage} onLoad={() => forceUpdate()} />)
         }
         if (marker.isAlerting) {
            imageElement = (<Image source={require('../../img/isAlerting.png')} style={styles.alertImage} onLoad={() => forceUpdate()} />)
         }
         return (
            <View style={styles.member}>
               {imageElement}
            </View>
         )
      },
      leader: () => {
         let imageElement = (
            <Image source={{
               uri: marker.imageUrl
            }} style={styles.leaderImage} onLoad={() =>  forceUpdate()}></Image>
         )
         if (!marker.imageUrl) {
            imageElement = (<Image source={require('../../img/default.jpg')} style={styles.leaderImage} onLoad={() => forceUpdate()} />)
         }
         return (
         <View style={styles.member}>
             {imageElement}
         </View>
      )
      },
      endPosition: () => (
         <View style={styles.member}>
            <FontAwesomeIcon name='flag' style={styles.endText} />
            <Text style={styles.endText}>{marker.name}</Text>
         </View>
      )
   }
   return (
      <Marker {...marker} title={marker.name}>
         {renderType[marker.type]()}
         <Callout style={styles.calloutView}>
            <Text style={styles.calloutTitle}>{marker.name}</Text>
            <Text style={styles.calloutContent}></Text>
         </Callout>
      </Marker>
   )
}

TravelMap.propTypes = {
   handleChangeMode: PropTypes.func,
   handleRequestToggleAlerting: PropTypes.func,
   handleRequestDirection: PropTypes.func,
   handleRequestRegion: PropTypes.func,
   handleToggleSideMenu: PropTypes.func,
   travel: PropTypes.object,
   userId: PropTypes.string
}

export default TravelMap
