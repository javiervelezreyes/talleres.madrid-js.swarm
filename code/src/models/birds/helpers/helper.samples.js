import Point   from '../model.point.js'
import RHelper from './helper.random.js'

const XMIN = -4
const XMAX = 4

function SHelper (slope, intercept, noise) {

  function create (size) {
    let points = []
    let idx    = 0
    while (idx < size) {
      let error = RHelper.Float (-noise, noise)
      let x     = RHelper.Float (XMIN, XMAX)
      let y     = slope * x + intercept + error
      points.push (Point (x, y))
      idx++
    }
    return points
  }

  return { create }

}

export default SHelper