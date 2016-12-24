'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, StyleSheet} from 'react-native'
//actions
import {requestGeolocation} from '../actions'
//components
import {CreateBody} from '../components/Create/index.js'

class CreateContainer extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.requestGeolocation()
    }

    render() {
        const {location} = this.props
        console.log(location)
        return (
            <View style={styles.container}>
                <CreateBody location={location}></CreateBody>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {location: state.location}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestGeolocation
    }, dispatch)
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

CreateContainer.propTypes = {
    location: PropTypes.object,
    requestGeolocation: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
