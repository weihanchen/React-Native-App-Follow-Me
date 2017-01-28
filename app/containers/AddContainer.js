'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, StyleSheet} from 'react-native'
//components
import {AddBody} from '../components/Add'

class AddContainer extends Component {
   constructor(props) {
      super(props)
   }

   handleAddToGroup(groupName, userName) {

   }

   render() {
     const {group} = this.props
     return (
        <AddBody group={group} handleAddToGroup={this.handleAddToGroup.bind(this)}></AddBody>
     )
   }
}

const mapStateToProps = (state) => {
   return {group: state.group}
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({

   }, dispatch)
}

AddContainer.propTypes = {
   group: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContainer)
