'use strict'
import React, {
  Component,
  PropTypes
} from 'react'
import {
  View,
  Text
} from 'react-native'
//components
import {
  CreateBody
} from '../components/Create/index.js'

class CreateContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View>
        <CreateBody></CreateBody>
      </View>
    )
  }
}

export default CreateContainer
