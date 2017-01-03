'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, StyleSheet} from 'react-native'
//actions
import {requestCreateGroup, requestGeolocation, requestGeocoding} from '../actions'
//components
import {CreateBody} from '../components/Create/index.js'

class CreateContainer extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.requestGeolocation()
    }

    handleCreateGroup(groupName, username, expiredTime, startPosition, endPosition) {
        this.props.requestCreateGroup(groupName, username, expiredTime, startPosition, endPosition)
    }

    handleSearchAddress(address) {
        this.props.requestGeocoding(address)
    }

    render() {
        const {location, geocoding} = this.props
        return (
            <View style={styles.container}>
                <CreateBody location={location} geocoding={geocoding}
                            handleSearchAddress={this.handleSearchAddress.bind(this)} handleCreateGroup={this.handleCreateGroup.bind(this)}>
                </CreateBody>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {location: state.location, geocoding: state.geocoding}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestCreateGroup,
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
    geocoding: PropTypes.object,
    location: PropTypes.object,
    requestCreateGroup: PropTypes.func,
    requestGeocoding: PropTypes.func,
    requestGeolocation: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
