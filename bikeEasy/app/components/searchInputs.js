import React, { Component } from 'react'
import { ScrollView, Text, AsyncStorage, Dimensions } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Button from 'react-native-button';

// const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

import DirectionsStore from '../stores/directionsStore'

const Directions = new DirectionsStore()

export default class SearchInput extends Component {
  constructor(props){
    super(props)
    this.state = {
      start: 'start ',
      end: 'end',
      depart: Date.now()
    }
}

  _useLocation() {
    // use geolocation api here
  }

  getCity(info) {
    for (let i = 0; i < info.address_components.length; i++) {
      if (info.address_components[i].types[0] === 'locality') {

        return info.address_components[i].long_name
      }
    }
  }

  render(){
    return(
    <ScrollView>
      <GooglePlacesAutocomplete
              placeholder='Start'
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails={true}
              renderDescription={(row) => row.description} // custom description render
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              let startCity = this.getCity(details)

              Directions.setStartCity(startCity)

              Directions.setAsyncStorageStart(`${details.geometry.location.lat}, ${details.geometry.location.lng}`)

                // this.setState({start: `${details.geometry.location.lat}, ${details.geometry.location.lng}`})
              }}
              getDefaultValue={() => {
                return ''; // text input default value
              }}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyC8Lgex8nTqbToDXIyayP-WHEe2ssI6j5c',
                language: 'en' // language of the results
              }}
              styles={{
                description: {
                  fontWeight: '800',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },

              }}

              currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
              currentLocationLabel="Current location"
              nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              // GoogleReverseGeocodingQuery={{
              //   // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              // }}
              // GooglePlacesSearchQuery={{
              //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              //   rankby: 'distance',
              // }}


              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

              // predefinedPlaces={[homePlace, workPlace]}

              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

              // renderRightButton={() => <Text>Custom text after the inputag</Text>}

              styles={{
                textInputContainer: {
                  backgroundColor: 'rgba(27, 4, 12, 0)',
                  borderTopWidth: 0,
                  borderBottomWidth:0,
                  marginTop: 140,
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  backgroundColor: 'rgba(27, 4, 12, .9)',
                  height: 38,
                  color: 'rgba(196, 196, 196, 1)',
                  fontWeight: '600',
                  fontSize: 16
                },
                predefinedPlacesDescription: {
                  color: '#5d5d5d',
                  fontWeight: '600',
                  fontSize: 16
                },
                poweredContainer: {
                  backgroundColor: 'rgba(230, 254, 246, 0.67)'
                },
                listView: {
                  backgroundColor: 'rgba(230, 254, 246, 0.87)'
                },
              }}
            />
            <GooglePlacesAutocomplete
                    placeholder='End'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={(row) => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                      let endCity = this.getCity(details)
                      Directions.setEndCity(endCity)
                      // now I need to set the return value of getCity into async storage and pull it out?
                      Directions.setAsyncStorageEnd(`${details.geometry.location.lat}, ${details.geometry.location.lng}`)
                    }}
                    getDefaultValue={() => {
                      return ''; // text input default value
                    }}
                    query={{
                      // available options: https://developers.google.com/places/web-service/autocomplete
                      key: 'AIzaSyC8Lgex8nTqbToDXIyayP-WHEe2ssI6j5c',
                      language: 'en' // language of the results
                    }}
                    styles={{
                      description: {
                        fontWeight: 'bold',
                      },
                      predefinedPlacesDescription: {
                        color: '#1faadb',
                      },
                    }}

                    currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    // GoogleReverseGeocodingQuery={{
                    //   // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    // }}
                    // GooglePlacesSearchQuery={{
                    //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    //   rankby: 'distance',
                    // }}


                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                    // predefinedPlaces={[homePlace, workPlace]}

                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

                    // renderRightButton={() => <Text>Custom text after the inputag</Text>}

                    styles={{
                      textInputContainer: {
                        backgroundColor: 'rgba(27, 4, 12, 0)',
                        borderTopWidth: 0,
                        borderBottomWidth:0
                      },
                      textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        backgroundColor: 'rgba(27, 4, 12, .9)',
                        height: 38,
                        color: 'rgba(196, 196, 196, 1)',
                        fontWeight: '600',
                        fontSize: 16
                      },
                      predefinedPlacesDescription: {
                        color: '#5d5d5d',
                        fontWeight: '600',
                        fontSize: 16
                      },
                      poweredContainer: {
                        backgroundColor: 'rgba(230, 254, 246, 0.67)'
                      },
                      listView: {
                        backgroundColor: 'rgba(230, 254, 246, 0.87)'
                      },
                    }}
                  />
        </ScrollView>
    )
  }
}
