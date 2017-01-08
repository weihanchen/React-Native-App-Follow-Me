'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, StyleSheet} from 'react-native'
//actions
import {requestFetchGroup} from '../actions'

class TravelContainer extends Component {
   constructor(props) {
      super(props)
   }

   componentDidMount() {
      const groupId = this.props.groupId
      this.props.requestFetchGroup(groupId)
   }

   componentWillReceiveProps(nextProps) {
      console.log(nextProps.group)
   }

   render() {
      return (
         <View style={styles.container}>
            <Text>TravelContainer</Text>
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
