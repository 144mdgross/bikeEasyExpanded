import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import Button from 'react-native-button';
import RNRestart from 'react-native-restart';

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

import DirectionsStore from '../stores/directionsStore';

const renderLegs = new DirectionsStore()

let pushedCoords = []
let finalCoords

let pushedText = []
let finalText

let totalTime
let totalDistance

// const TextCoords = React.createClass({
//   propTypes: {
//     onPress: React.PropTypes.func,
//     coords: React.PropTypes.string
//   },
//
//   getDefualtProps() {
//     return {
//       onPress: () => {},
//       coords: "40.018779, -105.276376",
//     }
//   }
// })

export default class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      start: "40.018779, -105.276376",
      end: "39.753931, -105.001159",
      startCity: '',
      endCity: '',
      busStart: '',
      busEnd: '',
      coords1: [],
      text1: [],
      coords2: [],
      text2: [],
      coords3: [],
      text3: [],
      coords: [],
      wholeText: [],
      totalTime: undefined,
      totalDistance: undefined,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      fetching: true
    }
  }

  componentWillMount(){

    renderLegs.getStartCoords()
    .then(start => {
      this.setState({ start })
    })

    renderLegs.getEndCoords()
      .then(end => {
        this.setState({ end })
      })

    renderLegs.getEndCity()
      .then(endCity => {
        this.setState({ endCity })
      })

    renderLegs.getStartCity()
      .then(startCity => {
        this.setState({ startCity })
      })
  }

  componentDidMount() {

  renderLegs.getStartCity()
      .then(startCity => {
        this.setState({ startCity })

    renderLegs.getBusRoute(this.state.startCity)
      .then(res => {
        this.setState({ busStart: res})

      renderLegs.getBusRoute(this.state.endCity)
          .then(res => {
            this.setState({ busEnd: res})

        renderLegs.getBikeDirections(this.state.start, this.state.startCity)
          .then(bikeDirections => {
            this.setState({coords1: bikeDirections.coordsBike})
            this.setState({text1: bikeDirections.instructions})

            renderLegs.getBusDirections(this.state.startCity, this.state.endCity)
              .then(busDirections => {
                this.setState({coords2: busDirections.coords})
                this.setState({text2: busDirections.instructions})

                renderLegs.getBikeDirections(this.state.endCity, this.state.end)
                  .then(bikeTwo => {
                    this.setState({coords3: bikeTwo.coordsBike})
                    this.setState({text3: bikeTwo.instructions})

                    pushedCoords.push(bikeDirections.coordsBike, busDirections.coords, bikeTwo.coordsBike)

                    finalCoords = pushedCoords.reduce((a, b) => {
                      return a.concat(b)
                    })

                    pushedText.push(bikeDirections.instructions, busDirections.instructions, bikeTwo.instructions)

                    finalText = pushedText.reduce((c, d) => {
                      return c.concat(d)
                    })

                    this.setState({coords: finalCoords})
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(finalText), fetching: false})

                    totalTime = bikeDirections.time + busDirections.time + bikeTwo.time
                    totalDistance = bikeDirections.distance = busDirections.distance + bikeTwo.distance
                    this.setState({ totalTime })
                    this.setState({ totalDistance })

                  })
                })
              })
            })
          })
        })
      .done()
  }

  _newSearch() {
    RNRestart.Restart();
  }

componentWillUnmount(){

}

  render() {
    let mapLat = this.state.start.slice()
    let splitCoords = mapLat.split(", ")
    let startLat = +splitCoords[0]
    let startLng = +splitCoords[1]

    return (
      <View style={styles.view}>
        <MapView
        ref = {(mapView) => { _mapView = mapView; }}
         style={styles.map} initialRegion={{
          latitude:startLat,
          longitude:startLng,
          latitudeDelta: 0.0002,
          longitudeDelta: 0.0111
        }}
        showsUserLocation={true}
        // followsUserLocation={true}
        loadingEnabled={true}
        loadingIndicatorColor="#e6fef6"
        loadingBackgroundColor="rgba(27, 4, 12, .9)"
        scrollEnabled={true}
        zoomEnabled={true}
        >
        <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="purple"/>

        </MapView>
        <Button
            containerStyle={styles.newSearch}
            styleDisabled={{color: 'red'}}
            onPress={() => this._newSearch()}>
            <Text style={styles.searchText}>back</Text>
        </Button>
        <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => {
              console.log('%%%%%%%%%%% rowData %%%%%%%%%%%%', rowData);
              return (
              <TouchableOpacity>
                  <Text style={styles.text} onPress = {() => _mapView.animateToCoordinate({
                   latitude: `${rowData.coords.lat}`,
                   longitude: `${rowData.coords.lng}`,
                  //  latitudeDelta: 0.1022,
                  //  longitudeDelta: 0.0321
                 }, 1000)}>{rowData.text}</Text>
              </TouchableOpacity>
            )
            }
            }
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            style={styles.directions}
          />
        </View>
      </View>
    )
  }
}
//
// <TouchableOpacity
//            onPress = {() => _mapView.animateToCoordinate({
//             latitude: LATITUDE,
//             longitude: LONGITUDE
//           }, 1000)}>
//           <Text>Tap</Text>
//         </TouchableOpacity>

// <SectionList
//           sections={[
//             {title: 'D', data: ['Devin']},
//             {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
//           ]}
//           renderItem={({item}) => <Text style={styles.listText}>{item}</Text>}
//           renderSectionHeader={({section}) => <Text style={styles.directions}>{section.title}</Text>}
//         />



const styles = StyleSheet.create({
  map: {
    padding: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * .7,
    borderWidth: 4,
    borderColor: 'rgba(0, 0, 0, .85)'
  },
  container: {
    flex: 1,
    // padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  directions: {
    flex: 1,
    marginTop: Dimensions.get('window').height * .65,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 90,
    bottom: 0,
    // borderWidth: 5,
    // borderColor: 'rgba(0, 0, 0, .85)'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  newSearch: {
    marginTop: 25,
    marginRight: 285,
    padding:10,
    height:45,
    width: 70,
    alignSelf: 'center',
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: 'rgba(0, 0, 0, .85)',
  },
  searchText: {
    // marginTop: 50,
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
  },
  text: {
   marginLeft: 12,
   fontSize: 18,
  //  color: 'rgba(63, 8, 28, 1)',
  color: 'white',
   fontWeight: '500',
 },
  view: {
    flex:1,
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, .85)'
  }
});
