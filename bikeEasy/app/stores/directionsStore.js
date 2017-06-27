import Polyline from '@mapbox/polyline'

export default class Directions {
  constructor(props) {
    this.state = {
      coords1: [],
      coords2: [],
      coords3: []
    }
  }

  async getBikeDirections(startBike, endBike) {
    try {
      let respBike = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startBike}&destination=${endBike}&mode=bicycling`)

      let respJsonBike = await respBike.json()
      console.log(respJsonBike.routes[0].legs[0].steps);
      let pointsBike = Polyline.decode(respJsonBike.routes[0].overview_polyline.points)

      let coordsBike = pointsBike.map((point, index) =>{
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      return coordsBike
    } catch(error) {
      alert(error)
      return error
    }
  }

  async getBusDirections(start, end) {
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&mode=transit`)

      let respJson = await resp.json()
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points)

      let coords = points.map((point, index) =>{
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      return coords
    } catch(error) {
      alert(error)
      return error
    }
  }

}
