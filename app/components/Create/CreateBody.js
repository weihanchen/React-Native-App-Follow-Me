'use strict'
import React, {Component, PropTypes} from 'react'

//plugins
import {
   ActivityIndicator,
   Animated,
   Button,
   DatePickerAndroid,
   Dimensions,
   InteractionManager,
   ScrollView,
   Text,
   TextInput,
   TimePickerAndroid,
   ToastAndroid,
   TouchableOpacity,
   View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import MapView, {Marker} from 'react-native-maps'

//stylesheets
import mainStyle from '../../stylesheets'
import styles from './styles'
import {ERROR_MESSAGE, LANGUAGE_KEY} from '../../config'
//utils
import {timeUtils} from '../../utils'

const screen = Dimensions.get('window')
const ASPECT_RATIO = screen.width / screen.height
const LATITUDE = 0
const LONGITUDE = 0
const LATITUDE_DELTA = 0.0122
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class CreateBody extends Component {
   constructor(props) {
      super(props)
      let endDate = moment(new Date()).add(2, 'hours');
      this.state = {
         endAddress: '',
         endPosition: {
            coordinate: {
              latitude: LATITUDE,
              longitude: LONGITUDE
            }
         },
         endTimeDate: endDate.valueOf(),
         endTimeDateText: endDate.format('YYYY/MM/DD'),
         endTimeHour: endDate.hours(),
         endTimeMinute: endDate.minute(),
         endTimeText: endDate.format('HH:mm'),
         groupName: '',
         region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
         },
         startPosition: {},
         userName: ''
      }
   }

   componentDidMount() {
      ToastAndroid.show(`${LANGUAGE_KEY.GETTING_POSITION}...`, ToastAndroid.SHORT)
   }

   componentWillReceiveProps(nextProps) {
      const geocodingStatusFun = {
         success: (geocoding) => {
            const coordinate = geocoding.coordinate
            const region = Object.assign({}, this.state.region, coordinate)
            this.setState({endPosition: {coordinate}, region})
         },
         error: (geocoding) => ToastAndroid.show(geocoding.error, ToastAndroid.SHORT)
      }

      const locationStatusFun = {
         success: () => {
            const coordinate = nextProps.location.coordinate
            const region = Object.assign({}, this.state.region, coordinate)
            this.setState({startPosition: coordinate, endPosition: {coordinate}, region})
         },
         error: () => ToastAndroid.show(ERROR_MESSAGE.POSITION_ERROR, ToastAndroid.SHORT)
      }
      if (geocodingStatusFun.hasOwnProperty(nextProps.geocoding.status) && nextProps.geocoding.status != this.props.geocoding.status)
         geocodingStatusFun[nextProps.geocoding.status](nextProps.geocoding)

      if (locationStatusFun.hasOwnProperty(nextProps.location.status) && nextProps.location.status != this.props.location.status)
         locationStatusFun[nextProps.location.status]()
   }

   onCreateGroup() {
      if (this.state.groupName.length <= 0) {
         ToastAndroid.show(LANGUAGE_KEY.PLEASE_INPUT_YOUR_GROUP_NAME, ToastAndroid.SHORT)
      } else if (this.state.userName.length <= 0) {
         ToastAndroid.show(LANGUAGE_KEY.PLEASE_INPUT_YOUR_USER_NAME, ToastAndroid.SHORT)
      } else if (this.props.location.status != 'success') {
         ToastAndroid.show(LANGUAGE_KEY.PLEASE_TURN_ON_POSITION, ToastAndroid.SHORT)
      } else {

         const endTimeDate = moment(this.state.endTimeDate),
            groupName = this.state.groupName,
            userName = this.state.userName,
            startPosition = this.state.startPosition,
            endPosition = this.state.endPosition,
            expiredTime = new Date(endTimeDate.get('year'), endTimeDate.get('month') + 1, endTimeDate.get('date'), this.state.endTimeHour, this.state.endTimeMinute).getTime()
         this.props.handleCreateGroup(groupName, userName, expiredTime, startPosition, endPosition)
      }
   }

   onSearchAdress() {
      let endAddress = this.state.endAddress
      if (endAddress.length <= 0) {
         ToastAndroid.show(LANGUAGE_KEY.PLEASE_INPUT_ADDRESS, ToastAndroid.SHORT)
         return
      }
      this.props.handleSearchAddress(endAddress)
   }

   showDatePicker = async(stateKey, options) => {
      try {
         var newState = {}
         const {action, year, month, day} = await DatePickerAndroid.open(options)
         if (action !== DatePickerAndroid.dismissedAction) {
            var date = new Date(year, month, day)
            newState[`${stateKey}DateText`] = moment(date).format('YYYY/MM/DD')
            newState[`${stateKey}Date`] = date
         }
         this.setState(newState)
      } catch ({code, message}) {
         console.warn(`Error in '${stateKey}': `, message)
      }
   }

   showTimePicker = async(stateKey, options) => {
      try {
         const {action, minute, hour} = await TimePickerAndroid.open(options)
         var newState = {}
         if (action === TimePickerAndroid.timeSetAction) {
            newState[`${stateKey}Text`] = timeUtils.toHHmm(hour, minute)
            newState[`${stateKey}Hour`] = hour
            newState[`${stateKey}Minute`] = minute
         }
         this.setState(newState)
      } catch ({code, message}) {
         console.warn(`Error in '${stateKey}': `, message)
      }
   }

   render() {
      const {location, geocoding, group} = this.props
      return (
         <ScrollView>
            <View style={styles.container}>
               <Text style={styles.title}>{LANGUAGE_KEY.PLEASE_INPUT_YOUR_GROUP_NAME}</Text>
               <TextInput value={this.state.groupName} maxLength={10} onChangeText={(groupName) => this.setState({groupName})}></TextInput>
               <Text style={styles.title}>{LANGUAGE_KEY.PLEASE_INPUT_YOUR_USER_NAME}</Text>
               <TextInput value={this.state.userName} maxLength={10} onChangeText={(userName) => this.setState({userName})}></TextInput>
               <Text style={styles.title}>{LANGUAGE_KEY.GROUP_ENDTIME}</Text>
               <View style={styles.endTime}>
                  <TouchableOpacity onPress={this.showDatePicker.bind(this, 'endTime', {date: this.state.endTimeDate})}>
                     <View style={styles.endTimeItem}>
                        <View style={styles.itemIcon}>
                           <Icon name='calendar' style={styles.itemText}/>
                        </View>
                        <View>
                           <Text style={styles.itemText}>{this.state.endTimeDateText}</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.showTimePicker.bind(this, 'endTime', {
                     hour: this.state.endTimeHour,
                     minute: this.state.endTimeMinute
                  })} activeOpacity={0.7}>
                     <View style={styles.endTimeItem}>
                        <View style={styles.itemIcon}>
                           <Icon name='clock-o' style={styles.itemText}/>
                        </View>
                        <View>
                           <Text style={styles.itemText}>{this.state.endTimeText}</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
               {_startPositionSection(location.status, location.error)}
               <Text style={styles.title}>{LANGUAGE_KEY.PLEASE_INPUT_YOUR_ENDPOSITION}</Text>
               <View style={styles.endAddressSearch}>
                  <TextInput value={this.state.endAddress} style={styles.endAddressSearchText} onChangeText={(endAddress) => this.setState({endAddress})}></TextInput>
                  <TouchableOpacity activeOpacity={0.8} onPress={this.onSearchAdress.bind(this)}>
                     {_searchAddressButton(geocoding.status, geocoding.error)}
                  </TouchableOpacity>
               </View>
               <MapView region={this.state.region} onRegionChange={(region) => this.setState({region})} style={styles.map}>
                  <Marker draggable title={LANGUAGE_KEY.PLEASE_PRESS_DRAG} coordinate={this.state.endPosition.coordinate} onDragEnd={(e) => this.setState({endPosition: {coordinate: e.nativeEvent.coordinate}})}/>
               </MapView>
               <TouchableOpacity style={styles.btnSubmit} activeOpacity={0.8} onPress={this.onCreateGroup.bind(this)}>
                  {_createGroupBtnSection(group.status)}
               </TouchableOpacity>
            </View>
         </ScrollView>
      )
   }
}

//private methods

const _createGroupBtnSection = (status) => {
   const defaultTemplate = (
      <Text style={styles.title}>{LANGUAGE_KEY.CONFIRM_CREATE_GROUP}</Text>
   )
   const renderStatus = {
      loading: () => (<ActivityIndicator color={mainStyle.color.skyblue} style={styles.startPositionItem}/>)
   }
   if (renderStatus.hasOwnProperty(status))  return renderStatus[status]()
   return defaultTemplate
}

const _searchAddressButton = (status, errorMessage) => {
   const defaultTemplate = (
      <View style={styles.btnSubmit}>
         <Icon name='search' size={mainStyle.font.medium} style={styles.smallGap}></Icon>
         <Text >{LANGUAGE_KEY.SEARCH}</Text>
      </View>
   )
   const renderStatus = {
      init: () => defaultTemplate,
      loading: () => (<ActivityIndicator color={mainStyle.color.skyblue} style={styles.startPositionItem}/>),
      success: () => defaultTemplate,
      error: () => {
         return defaultTemplate
      }
   }
   return renderStatus[status]()
}

const _startPositionSection = (status, errorMessage) => {
   const renderStatus = {
      init: () => (
         <View></View>
      ),
      loading: () => (
         <View style={styles.startPosition}>
            <Text style={[styles.title, styles.startPositionItem]}>{LANGUAGE_KEY.START_POSITION}</Text>
            <ActivityIndicator color={mainStyle.color.skyblue} style={styles.startPositionItem}/>
            <Text style={styles.tipText}>{LANGUAGE_KEY.GETTING_POSITION}...</Text>
         </View>
      ),
      success: () => (
         <View style={styles.startPosition}>
            <Text style={[styles.title, styles.startPositionItem]}>{LANGUAGE_KEY.START_POSITION}</Text>
            <Icon name='map-marker' style={[styles.startPositionItem, styles.itemText]}/>
            <Text style={styles.title}>{LANGUAGE_KEY.ALREADY_USE_YOUR_POSITION}</Text>
         </View>
      ),
      error: () => {
         return (
            <View style={styles.startPosition}>
               <Text style={[styles.title, styles.startPositionItem]}>{LANGUAGE_KEY.START_POSITION}</Text>
               <Icon name='times' style={[styles.startPositionItem, styles.errorText]}/>
               <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
         )
      }
   }
   return renderStatus[status]()
}

CreateBody.propTypes = {
   geocoding: PropTypes.object,
   group: PropTypes.object,
   location: PropTypes.object,
   handleCreateGroup: PropTypes.func,
   handleCreateSuccess: PropTypes.func,
   handleSearchAddress: PropTypes.func
}

export default CreateBody
