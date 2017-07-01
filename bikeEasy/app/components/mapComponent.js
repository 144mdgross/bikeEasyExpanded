import React, { Component } from 'react'
import { View, Text, ListView, StyleSheet, Dimensions, AsyncStorage } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import Button from 'react-native-button';
import { Spinner } from 'native-base'

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
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      fetching: true
    }
  }

  forceUpdate() {
    console.log('forceUpdate is being called yo');
    // this.setState({pushedCoords: []})
    // console.log('%%%%%% pushedCoords %%%%%%%%%%%', this.state.pushedCoords);
    // this.setState({pushedText: []})
    // console.log('%%%%%% pushedText %%%%%%%%%%%', this.state.pushedText);
    // this.setState({finalText: []})
    // console.log('%%%%%% finalText %%%%%%%%%%%', this.state.finalText);
    // this.setState({finalCoords: []})
    // console.log('%%%%%% finalCoords %%%%%%%%%%%', this.state.finalCoords);
    // this.setState({dataSource: this.state.dataSource.cloneWithRows(finalText), fetching: true})
  }

  componentWillMount(){
    // this.forceUpdate()
    console.log('%%%%%%%%%%% this.state.coords in componentWillMount', this.state.coords);
    console.log('%%%%%%%%%%% this.state.wholeText in componentWillMount', this.state.wholeText);

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
      console.log('%%%%%%%%%%% this.state.coords in componentDidMount', this.state.coords);
      console.log('%%%%%%%%%%% this.state.wholeText in componentDidMount', this.state.wholeText);
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
            this.setState({text1: bikeDirections.text})

            renderLegs.getBusDirections(this.state.startCity, this.state.endCity)
              .then(busDirections => {
                this.setState({coords2: busDirections.coords})
                this.setState({text2: busDirections.text})

                renderLegs.getBikeDirections(this.state.endCity, this.state.end)
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
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(finalText), fetching: false})

                  })
                })
              })
            })
          })
        })
    // added this after looking at r-n listView example
      .done()
  }

  _newSearch() {
    // this.setState({startCity: '', endCity: '',  busStart: '', busEnd: '', coords1: [], text1: [], coords2: [], text2: [], coords3: [], text3: [], coords: [], wholeText: [], loaded: false })

    this.props.navigator.pop()

    // this.props.navigator.replace({
    //   title: 'Start Trip'
    // })
  }

componentWillUnmount(){
  console.log('componentWillUnmount is being called yo');
  // this.setState({pushedCoords: []})
  console.log('%%%%%% pushedCoords %%%%%%%%%%%', this.state.pushedCoords);
  // this.setState({pushedText: []})
  console.log('%%%%%% pushedText %%%%%%%%%%%', this.state.pushedText);
  // this.setState({finalText: []})
  console.log('%%%%%% finalText %%%%%%%%%%%', this.state.finalText);
  // this.setState({finalCoords: []})
  console.log('%%%%%% finalCoords %%%%%%%%%%%', this.state.finalCoords);
  // this.setState({dataSource: this.state.dataSource.cloneWithRows(finalText), fetching: true})

  // MapView.Polyline.remove()
  // const blankState = {};
  //     Object.keys(this.state).forEach(stateKey => {
  //       if(stateKey !== 'dataSource') {
  //       blankState[stateKey] = undefined;
  //       }
  //     });
  //     this.setState(blankState);
  //     console.log('%%%%%%% this.state after componentWillUnmount %%%%%%', this.state.coords, this.state.wholeText);
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
    paddingTop: 1,
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
