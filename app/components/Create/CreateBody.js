'use strict'
import React, {Component, PropTypes} from 'react'

//plugins
import {
   ActivityIndicator,
   Animated,
   Button,
   DatePickerAndroid,
   Dimensions,
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
import MapView from 'react-native-maps'

//stylesheets
import mainStyle from '../../stylesheets'
import styles from './styles'

//utils
import {timeUtils} from '../../utils'

const screen = Dimensions.get('window')
const ASPECT_RATIO = screen.width / screen.height
const LATITUDE = 23.6010548
const LONGITUDE = 120.4536408
const LATITUDE_DELTA = 0.0122
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class CreateBody extends Component {
   constructor(props) {
      super(props)
      let endDate = moment(new Date()).add(2, 'hours');
      this.state = {
         endAddress: '',
         endPosition: {
            latitude: LATITUDE,
            longitude: LONGITUDE
         },
         endTimeDate: endDate.date(),
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

   watchID :
      ? number = null

   componentDidMount() {
      ToastAndroid.show('正在取得您目前的位置...', ToastAndroid.SHORT)
      this.watchID = navigator.geolocation.watchPosition((position) => {
         console.log(position)
         let lastPosition = JSON.stringify(position)
         this.setState({lastPosition})
      }, (error) => console.log(error), {
         enableHighAccuracy: true,
         timeout: 1000,
         maximumAge: 1000
      })

   }

   componentWillReceiveProps(nextProps) {
      const geocodingStatusFun = {
         success: () => {
            const coordinate = nextProps.geocoding.coordinate
            const region = Object.assign({}, this.state.region, coordinate)
            this.setState({endPosition: coordinate, region})
         },
         error: (error) => ToastAndroid.show(error, ToastAndroid.SHORT)
      }
      const groupStatusFun = {
         create_success: () => {},
         error: (error) => ToastAndroid.show(error, ToastAndroid.SHORT)
      }
      const locationStatusFun = {
         success: () => {
            const coordinate = nextProps.location.coordinate
            const region = Object.assign({}, this.state.region, coordinate)
            this.setState({startPosition: coordinate, endPosition: coordinate, region})
         },
         error: (error) => ToastAndroid.show('請開啟定位服務', ToastAndroid.SHORT)
      }
      if (geocodingStatusFun.hasOwnProperty(nextProps.geocoding.status) && nextProps.geocoding.status != this.props.geocoding.status)
         geocodingStatusFun[nextProps.geocoding.status]()
      if (groupStatusFun.hasOwnProperty(nextProps.group.status) && nextProps.group.status != this.props.group.status)
         groupStatusFun[nextProps.group.status]()
      if (locationStatusFun.hasOwnProperty(nextProps.location.status) && nextProps.location.status != this.props.location.status)
         locationStatusFun[nextProps.location.status]()
   }

   componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID)
   }

   onCreateGroup() {
      if (this.state.groupName.length <= 0) {
         ToastAndroid.show('請輸入您的車隊名稱', ToastAndroid.SHORT)
      } else if (this.state.userName.length <= 0) {
         ToastAndroid.show('請輸入您的暱稱', ToastAndroid.SHORT)
      } else if (this.props.location.status != 'success') {
         ToastAndroid.show('請開啟定位服務', ToastAndroid.SHORT)
      } else {
         const endTimeDate = moment(this.state.endTimeDate),
            groupName = this.state.groupName,
            userName = this.state.userName,
            startPosition = this.state.startPosition,
            endPosition = this.state.endPosition,
            expiredTime = new Date(endTimeDate.get('year'), endTimeDate.get('month') + 1, endTimeDate.get('date'), this.state.endTimeHour, this.state.endTimeMinute)
         this.props.handleCreateGroup(groupName, userName, expiredTime, startPosition, endPosition)
      }
   }

   onSearchAdress() {
      let endAddress = this.state.endAddress
      if (endAddress.length <= 0) {
         ToastAndroid.show('請輸入地址', ToastAndroid.SHORT)
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
               <Text style={styles.title}>請輸入車隊名稱</Text>
               <TextInput value={this.state.groupName} maxLength={10} onChangeText={(groupName) => this.setState({groupName})}></TextInput>
               <Text style={styles.title}>請輸入您的暱稱</Text>
               <TextInput value={this.state.userName} maxLength={10} onChangeText={(userName) => this.setState({userName})}></TextInput>
               <Text style={styles.title}>車隊結束時間</Text>
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
               <Text style={styles.title}>請輸入您的終點</Text>
               <View style={styles.endAddressSearch}>
                  <TextInput value={this.state.endAddress} style={styles.endAddressSearchText} onChangeText={(endAddress) => this.setState({endAddress})}></TextInput>
                  <TouchableOpacity activeOpacity={0.8} onPress={this.onSearchAdress.bind(this)}>
                     {_searchAddressButton(geocoding.status, geocoding.error)}
                  </TouchableOpacity>
               </View>
               <MapView region={this.state.region} onRegionChange={(region) => this.setState({region})} style={styles.map}>
                  <MapView.Marker draggable title="請長按並拖拉" coordinate={this.state.endPosition} onDragEnd={(e) => this.setState({endPosition: e.nativeEvent.coordinate})}/>
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
      <Text style={styles.title}>確定創建車隊</Text>
   )
   const renderStatus = {
      init: () => defaultTemplate,
      loading: () => (<ActivityIndicator color={mainStyle.color.skyblue} style={styles.startPositionItem}/>),
      create_success: () => defaultTemplate,
      error: () => defaultTemplate
   }
   return renderStatus[status]()
}

const _searchAddressButton = (status, errorMessage) => {
   const defaultTemplate = (
      <View style={styles.btnSubmit}>
         <Icon name='search' size={mainStyle.font.medium} style={styles.smallGap}></Icon>
         <Text >搜尋</Text>
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
            <Text style={[styles.title, styles.startPositionItem]}>起點</Text>
            <ActivityIndicator color={mainStyle.color.skyblue} style={styles.startPositionItem}/>
            <Text style={styles.tipText}>正在取得您目前的位置...</Text>
         </View>
      ),
      success: () => (
         <View style={styles.startPosition}>
            <Text style={[styles.title, styles.startPositionItem]}>起點</Text>
            <Icon name='map-marker' style={[styles.startPositionItem, styles.itemText]}/>
            <Text style={styles.title}>已使用您目前的位置</Text>
         </View>
      ),
      error: () => {
         return (
            <View style={styles.startPosition}>
               <Text style={[styles.title, styles.startPositionItem]}>起點</Text>
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
   handleSearchAddress: PropTypes.func
}

export default CreateBody
