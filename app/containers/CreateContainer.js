'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, StyleSheet} from 'react-native'
//actions
import {requestGeolocation, requestGeocoding} from '../actions'
//components
import {CreateBody} from '../components/Create/index.js'

class CreateContainer extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.requestGeolocation()
    }

    handleSearchAddress(address) {
        this.props.requestGeocoding(address)
    }

    render() {
        const {location, geocoding} = this.props
        return (
            <View style={styles.container}>
                <CreateBody location={location} geocoding={geocoding} handleSearchAddress={this.handleSearchAddress.bind(this)}></CreateBody>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {location: state.location, geocoding: state.geocoding}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestGeocoding,
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
    requestGeocoding: PropTypes.func,
    requestGeolocation: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
