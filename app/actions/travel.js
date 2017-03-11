export const CHANGE_TRAVEL_MODE = 'CHANGE_TRAVEL_MODE'
export const REMOVE_MEMBER = 'REMOVE_MEMBER'
export const REQUEST_MARKER_ACTIVE_DIRECTION = 'REQUEST_MARKER_ACTIVE_DIRECTION'
export const REQUEST_MARKER_ACTIVE_DIRECTION_SUCCESS = 'REQUEST_MARKER_ACTIVE_DIRECTION_SUCCESS'
export const REQUEST_ADD_TRAVEL_MEMBER = 'REQUEST_ADD_TRAVEL_MEMBER'
export const REQUEST_ADD_TRAVEL_MEMBER_SUCCESS = 'REQUEST_ADD_TRAVEL_MEMBER_SUCCESS'
export const REQUEST_TRAVEL_DIRECTIONS = 'REQUEST_TRAVEL_DIRECTIONS'
export const REQUEST_TRAVEL_DIRECTIONS_SUCCESS = 'REQUEST_TRAVEL_DIRECTIONS_SUCCESS'
export const REQUEST_TRAVEL_FAILED = 'REQUEST_TRAVEL_FAILED'
export const REQUEST_TRAVEL_INIT = 'REQUEST_TRAVEL_INIT'
export const REQUEST_TRAVEL_INIT_SUCCESS = 'REQUEST_TRAVEL_INIT_SUCCESS'
export const REQUEST_TRAVEL_UPDATE_COORDINATE = 'REQUEST_TRAVEL_UPDATE_COORDINATE'
export const REQUEST_TRAVEL_UPDATE_COORDINATE_SUCCESS = 'REQUEST_TRAVEL_UPDATE_COORDINATE_SUCCESS'
export const UPDATE_TRAVEL_MARKERS = 'UPDATE_TRAVEL_MARKERS'
export const UPDATE_TRAVEL_REGION = 'UPDATE_TRAVEL_REGION'

const changeTravelMode = (mode) => ({
   type: CHANGE_TRAVEL_MODE,
   mode
})

const removeMember = (markers, memberMap, key) => {
   markers = markers.slice()
   memberMap = Object.assign({}, memberMap)
   const markerIdx = markers.findIndex(marker => marker.key === key)
   markers.splice(markerIdx, 1)
   delete memberMap[key]
   return {
      type: REMOVE_MEMBER,
      markers,
      memberMap
   }
}

const requestAddTravelMember = (member) => ({
   type: REQUEST_ADD_TRAVEL_MEMBER,
   member
})

const requestFetchTravelInit = (coordinate, currentUid, groupId) => ({
   type: REQUEST_TRAVEL_INIT,
   coordinate,
   currentUid,
   groupId
})

const requestTravelDirections = (startCoordinate, endCoordinate, mode) => ({
   type: REQUEST_TRAVEL_DIRECTIONS,
   startCoordinate,
   endCoordinate,
   mode
})

const requestTravelUpdateCoordinate = (groupId, userId, coordinate) => ({
   type: REQUEST_TRAVEL_UPDATE_COORDINATE,
   groupId,
   userId,
   coordinate
})

const updateMarkerActiveDirection = (startCoordinate, markers, marker, mode) => {
   return {
      type: REQUEST_MARKER_ACTIVE_DIRECTION,
      startCoordinate,
      markers,
      marker,
      mode
   }
}

const updateMarkerAlerting = (markers, key, isAlerting) => {//duplicate code
   const updatedMarkers = markers.map(marker => {
      if (marker.key === key) marker = Object.assign({}, marker, {
         isAlerting
      })
      return marker
   })
   return {
      type: UPDATE_TRAVEL_MARKERS,
      markers: updatedMarkers
   }
}

const updateMarkerCoordinate = (markers, key, coordinate) => {//duplicate code
   const updatedMarkers = markers.map(marker => {
      if (marker.key === key) marker = Object.assign({}, marker, {
         coordinate
      })
      return marker
   })
   return {
      type: UPDATE_TRAVEL_MARKERS,
      markers: updatedMarkers
   }
}

const updateTravelRegion = (coordinate) => ({
   type: UPDATE_TRAVEL_REGION,
   coordinate
})

export {
   changeTravelMode,
   removeMember,
   requestAddTravelMember,
   requestFetchTravelInit,
   requestTravelDirections,
   requestTravelUpdateCoordinate,
   updateMarkerActiveDirection,
   updateMarkerAlerting,
   updateMarkerCoordinate,
   updateTravelRegion
}
