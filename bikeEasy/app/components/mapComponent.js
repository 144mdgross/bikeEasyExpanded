import React, { Component } from 'react'
import { View, Text, ListView, StyleSheet, Dimensions } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import Button from 'react-native-button';

import MapView from 'react-native-maps'
import Polyline from '@mapbox/polyline'

import DirectionsStore from '../stores/directionsStore'

const renderLegs = new DirectionsStore()

let pushedCoords = []
let finalCoords

let pushedText = []
let finalText

export default class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      coords1: [],
      text1: [],
      coords2: [],
      text2: [],
      coords3: [],
      text3: [],
      coords: [],
      wholeText: [],
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loaded: false
    }
  }

  componentDidMount() {
  renderLegs.getBikeDirections("40.018779, -105.276376", "40.016779, -105.276376")
    .then(bikeDirections => {
      this.setState({coords1: bikeDirections.coordsBike})
      this.setState({text1: bikeDirections.text})

      renderLegs.getBusDirections("40.016779, -105.276376", "39.753931, -105.001159")
        .then(busDirections => {
          this.setState({coords2: busDirections.coords})
          this.setState({text2: busDirections.text})

          renderLegs.getBikeDirections("39.753931, -105.001159", "39.755931, -105.001159")
            .then(bikeTwo => {
              this.setState({coords3: bikeTwo.coordsBike})
              this.setState({text3: bikeTwo.text})

              pushedCoords.push(bikeDirections.coordsBike, busDirections.coords, bikeTwo.coordsBike)

              finalCoords = pushedCoords.reduce((a, b) => {
                return a.concat(b)
              })
              // console.log(finalCoords);

              pushedText.push(bikeDirections.text, busDirections.text, bikeTwo.text)

              finalText = pushedText.reduce((c, d) => {
                return c.concat(d)
              })
              // console.log(finalText);

              this.setState({coords: finalCoords})
              this.setState({dataSource: this.state.dataSource.cloneWithRows(finalText), loaded: true})

            })
        })
    })
    // added this after looking at r-n listView example
      .done()
  }

  _newSearch() {
    this.props.navigator.replace({
      title: 'Start Trip'
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
        <Button
            style={styles.newSearch}
            styleDisabled={{color: 'red'}}
            onPress={() => this._newSearch()}>
            New Search
        </Button>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
          style={styles.directions}
        />
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
    height: Dimensions.get('window').height * .85
  },
  directions: {
    flex: 1,
    marginTop: Dimensions.get('window').height * .85,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 90,
    bottom: 0

  },
  newSearch: {
    marginTop: 20,
  }
});



//

// <ScrollView style={styles.directions}>
//   <Text> where do i go? </Text>
//   <Text> where do i go? </Text>
//   <Text> where do i go? </Text>
//   <Text> where do i go? </Text>
//   <Text> where do i go? </Text>
// </ScrollView>
