import Polyline from '@mapbox/polyline'
import {
  AsyncStorage
} from 'react-native'

export default class Directions {

  async setAsyncStorageStart(searchCoords) {
    try {
      await AsyncStorage.setItem('start', searchCoords)
    } catch (error) {
      console.log(error);
    }
  }

  async setAsyncStorageEnd(endCoords) {
    try {
      await AsyncStorage.setItem('end', endCoords)
    } catch (error) {
      console.log(error);
    }
  }

  async setStartCity(startCity) {
    try {
      await AsyncStorage.setItem('startCity', startCity)
    } catch (error) {
      console.log(error);
    }
  }

  async setEndCity(endCity) {
    try {
      await AsyncStorage.setItem('endCity', endCity)
    } catch (error) {
      console.log(error);
    }
  }



  async getStartCoords() {
    try {
      const startLatLng = await AsyncStorage.getItem('start');
      if (startLatLng !== null) {
        return startLatLng

      }
    } catch (error) {
      console.log(error);
    }
  }

  async getEndCoords() {
    try {
      const endLatLng = await AsyncStorage.getItem('end');
      if (endLatLng !== null) {
        return endLatLng

      }
    } catch (error) {
      console.log(error);
    }
  }

  async getStartCity() {
    try {
      const startLoc = await AsyncStorage.getItem('startCity');
      if (startLoc !== null) {
        return startLoc

      }
    } catch (error) {
      console.log(error);
    }
  }

  async getEndCity() {
    try {
      const endLoc = await AsyncStorage.getItem('endCity');
      if (endLoc !== null) {
        return endLoc

      }
    } catch (error) {
      console.log(error);
    }
  }

  async getBikeDirections(startBike, endBike) {
    try {
      let respBike = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startBike}&destination=${endBike}&mode=bicycling`)

      let respJsonBike = await respBike.json()
      let completeBikeSteps = respJsonBike.routes[0].legs[0].steps
      console.log('completeBikeSteps **************', completeBikeSteps);
      let pointsBike = Polyline.decode(respJsonBike.routes[0].overview_polyline.points)

      let coordsBike = pointsBike.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })

      let bikeText = completeBikeSteps.map((obj, index) => {
        let regex = /(<([^>]+)>)/ig,
          result = obj.html_instructions.replace(regex, " ")
        return result
      })

      let stepDistanceBike = completeBikeSteps.map((step, index) => {
        return step.distance.text
      })

      let stepCoords = completeBikeSteps.map((stepStart, index) => {
        return stepStart.start_location
      })

      let instructions = []

      for(let i = 0, j = 0; i < bikeText.length && j < stepDistanceBike.length; i++, j++) {
        instructions.push(`${bikeText[i]} - ${stepDistanceBike[i]}`)
      }

      console.log('%%%%%%%%%% bike instructions', instructions);

      return {
        coordsBike,
        instructions,
        stepCoords
      }
    } catch (error) {
      alert(error)
      return error
    }
  }

  async getBusRoute(city) {
    try {
      let route = await fetch(`https://bike-easy-routes.herokuapp.com/${city}`)
      return route
    } catch (error) {
      alert(error)
      return error
    }
  }

  async getBusDirections(start, end) {
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&mode=transit`)

      let respJson = await resp.json()
      let completeSteps = respJson.routes[0].legs[0].steps

      let points = Polyline.decode(respJson.routes[0].overview_polyline.points)

      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })

      let text = completeSteps.map((obj, index) => {
        return obj.html_instructions
      })

      let stepDistance = completeSteps.map((step, index) => {
        return step.distance.text
      })

      let instructions = []

      for(let i = 0, j = 0; i < text.length && j < stepDistance.length; i++, j++) {
        instructions.push(`${text[i]} - ${stepDistance[i]}`)
      }
      console.log('%%%%%%%%%%%%%%%%%%%% instructions %%%%%%%%%%%%%%%%%%%', instructions);

      let stepCoords = completeSteps.map((stepStart, index) => {
        return stepStart.start_location
      })

      return {
        coords,
        instructions,
        stepCoords
      }
    } catch (error) {
      alert(error)
      return error
    }
  }
}
