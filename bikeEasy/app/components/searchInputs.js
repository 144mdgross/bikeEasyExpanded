import React, { Component } from 'react'
import { View, Text, TextInput, Icon, Picker } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Button from 'react-native-button';

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


export default class SearchInput extends Component {
  constructor(props){
    super(props)
    this.state = {
      start: 'start ',
      end: 'end',
      depart: Date.now()
    }
}

  _handlePress() {
    this.props.navigator.replace({
        title: 'Map'
      })
    }

  _useLocation() {
    // use geolocation api hereeeeeeee

  }

  render(){
    return(
      <GooglePlacesAutocomplete
              placeholder=''
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails={true}
              renderDescription={(row) => row.description} // custom description render
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                console.log(data);
                console.log(details);
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

              currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
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

              predefinedPlaces={[homePlace, workPlace]}

              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

              renderRightButton={() => <Text>Custom text after the inputag</Text>}

              styles={{
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth:0
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                },
              }}
            />
    )
  }
}


// <View>
// <Button
//     style={{fontSize: 20, color: 'green'}}
//     styleDisabled={{color: 'red'}}
//     onPress={() => this._useLocation()}>
//     use my location
// </Button>
//   <TextInput
//       style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//       onChangeText={start => this.setState({start})}
//       value={this.state.start}
//     />
//     <TextInput
//         style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//         onChangeText={end => this.setState({end})}
//         value={this.state.end}
//       />
//     <Button
//         style={{fontSize: 20, color: 'green'}}
//         styleDisabled={{color: 'red'}}
//         onPress={() => this._handlePress()}>
//         Go!
//     </Button>
//     <Picker
//       selectedValue={this.state.depart}
//       onValueChange={(time) => this.setState({depart: time})}>
//       <Picker.Item label="Java" value="java" />
//       <Picker.Item label="JavaScript" value="js" />
//     </Picker>
// </View>
