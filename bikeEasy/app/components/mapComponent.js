import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import Button from 'react-native-button';

import MapView from 'react-native-maps'
import Polyline from '@mapbox/polyline'

import DirectionsStore from '../stores/directionsStore'

const renderLegs = new DirectionsStore()

// case in switch named 'Map'

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords1: [],
      coords2: [],
      coords3: [],
      coords: []
    }
  }

  componentDidMount() {
  renderLegs.getBikeDirections("40.018779, -105.276376", "40.016779, -105.276376")
    .then(bikeDirections => {
      this.setState({coords1: bikeDirections})

      renderLegs.getBusDirections("40.016779, -105.276376", "39.753931, -105.001159")
        .then(busDirections => {
          this.setState({coords2: busDirections})

          renderLegs.getBikeDirections("39.753931, -105.001159", "39.755931, -105.001159")
            .then(bikeTwo => {
              this.setState({coords3: bikeTwo})

              this.setState({coords: bikeDirections.concat(busDirections.concat(bikeTwo))})
            })
        })
    })
  }

  _viewList() {
    this.props.navigator.replace({
      title: 'List'
    })
  }

  render() {
    return (
      <View>
        <MapView style={styles.map} initialRegion={{
          latitude:39.753931,
          longitude:-105.001159,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>
        <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="purple"/>

        </MapView>
        <View>
        <Button
            style={{fontSize: 20, color: 'green'}}
            styleDisabled={{color: 'red'}}
            onPress={() => this._viewList()}>
            Text Directions
        </Button>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});
