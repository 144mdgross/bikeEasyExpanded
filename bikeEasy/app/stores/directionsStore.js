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
      let pointsBike = Polyline.decode(respJsonBike.routes[0].overview_polyline.points)

      let coordsBike = pointsBike.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })

      let text = completeBikeSteps.map((obj, index) => {
        let regex = /(<([^>]+)>)/ig,
          result = obj.html_instructions.replace(regex, " ")
        return result
      })

      return {
        coordsBike,
        text
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

      return {
        coords,
        text
      }
    } catch (error) {
      alert(error)
      return error
    }
  }
}
